'use server';

import { Event, Phase, Prisma } from '@/generated/prisma/client';
import { messages as t } from '@/i18n';
import { auth } from '@/utils/auth';
import { headers } from 'next/headers';
import { validate } from 'uuid';
import prisma from '../db';
import { withAuth } from '../helpers';
import { NewEventData } from '../schemas/event';
import { ServiceResult } from '../types/serviceResult';

/**
 * Returns all published events from the database. Only accessible for
 * authenticated users.
 *
 * @returns A promise with all published events.
 */
export async function getPublishedEvents(): Promise<
  ServiceResult<(Event & { phases: Phase[] })[]>
> {
  const hasPermission = await auth.api.userHasPermission({
    body: {
      permissions: {
        event: ['fetchPublished'],
      },
    },
  });

  if (!hasPermission.success) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  // Fetch all events where status is published and include the phases
  const res = await prisma.event.findMany({
    where: {
      status: 'PUBLISHED',
    },
    include: {
      phases: true,
    },
  });

  if (!res) {
    return {
      ok: false,
      error: t.errors.failedToFetch('events'),
    };
  }

  return {
    ok: true,
    data: res,
  };
}

/**
 * Returns all events from the database. Only admins can fetch all events.
 *
 * @returns A promise with all events.
 */
export async function getAllEvents(): Promise<ServiceResult<Event[]>> {
  // Only admins can fetch ALL events
  const hasPermission = await auth.api.userHasPermission({
    body: {
      permissions: {
        event: ['fetchAll'],
      },
    },
  });

  if (!hasPermission.success) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  try {
    // TODO: This needs to be optimized
    // When at scale, we should not fetch all events at once
    // but rather paginate the results
    const res = await prisma.event.findMany();

    if (!res) {
      throw new Error('Failed to fetch events');
    }

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: 'Failed to fetch events. Something went wrong.',
    };
  }
}
/**
 * Creates a new event in the database. Only admins can create new events.
 *
 * @param name The name of the event.
 * @param description The description of the event.
 * @param status The status of the event.
 *
 * @returns A promise with the created event.
 */
export async function createEvent({
  name,
  description,
}: NewEventData): Promise<ServiceResult<Event>> {
  // Only admins can create new events
  const hasPermission = await auth.api.userHasPermission({
    body: {
      permissions: {
        event: ['create'],
      },
    },
  });

  if (!hasPermission.success) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  try {
    const user = await auth.api.getSession({
      headers: await headers(),
    });

    if (user === null) {
      return {
        ok: false,
        error: t.errors.failedToFetch('user'),
      };
    }

    const res = await prisma.event.create({
      data: {
        name,
        description,
        status: 'DRAFT',
        createdById: user.user.id,
      },
    });

    if (res === null) {
      throw new Error(t.errors.notCreated('Unternehmen'));
    }

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: 'Failed to create event. Something went wrong.',
    };
  }
}

/**
 * Returns a single event from the database by its ID. If multiple events
 * are found, a warning is logged and no event is returned.
 *
 * If the event is not published and the user is not an admin, the event
 * will not be returned.
 *
 * @param eventId - The ID of the event to fetch.
 *
 * @returns A promise with the event.
 */
export async function getEventById(
  eventId: string
): Promise<ServiceResult<Event>> {
  const hasPermission = await auth.api.userHasPermission({
    body: {
      permissions: {
        event: ['fetchPublished'],
      },
    },
  });

  if (!hasPermission.success) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  try {
    // Get the event from the database
    const res = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    // Check if more than one event was found
    if (res === null) {
      throw new Error(t.errors.eventNotFound(eventId));
    }

    // Only admins can fetch unpublished events
    if (res.status !== 'PUBLISHED') {
      const hasAdminPermission = await auth.api.userHasPermission({
        body: {
          permissions: {
            event: ['fetchAll'],
          },
        },
      });

      if (!hasAdminPermission) {
        return {
          ok: false,
          error: t.errors.notAuthorized(),
        };
      }
    }

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: 'Failed to fetch event. Something went wrong.',
    };
  }
}

export const getAllNonArchivedEvents = withAuth<[], Event[]>(
  async () => {
    const res = await prisma.event.findMany({
      where: {
        NOT: {
          status: 'ARCHIVED',
        },
      },
    });

    if (!res) {
      throw new Error('Failed to fetch Events.');
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      event: ['fetchAll'],
    },
  }
);

export async function getAllNonArchivedEventsDeprecated(): Promise<
  ServiceResult<Event[]>
> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error('User is not authenticated');
    }

    const hasPermission = await auth.api.userHasPermission({
      body: {
        role: 'admin',
        permissions: {
          event: ['fetchAll'],
        },
      },
      headers: await headers(),
    });
    console.log('Has permission', hasPermission);

    if (!hasPermission.success) {
      return {
        ok: false,
        error: t.errors.notAuthorized(),
      };
    }

    const res = await prisma.event.findMany({
      where: {
        NOT: {
          status: 'ARCHIVED',
        },
      },
    });

    if (!res) {
      return {
        ok: false,
        error: t.errors.failedToFetch('events'),
      };
    }

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: 'Failed to fetch events. Something went wrong.',
    };
  }
}

interface EventWithPhases extends Event {
  phases: Phase[];
}

export async function getPublishedEventById({
  eventId,
}: {
  eventId: string;
}): Promise<ServiceResult<EventWithPhases>> {
  const hasPermission = await auth.api.userHasPermission({
    body: {
      permissions: {
        event: ['fetchPublished'],
      },
    },
  });

  if (!hasPermission.success) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  try {
    if (!validate(eventId)) {
      throw new Error('Invalid event ID.');
    }

    const res = await prisma.event.findFirstOrThrow({
      where: {
        AND: [
          {
            id: eventId,
          },
          {
            status: 'PUBLISHED',
          },
        ],
      },
      include: {
        phases: {
          where: {
            type: 'APPLICATION',
          },
        },
      },
    });

    if (res.phases.length === 0) {
      return {
        ok: false,
        error: 'Event has no application phase.',
      };
    }

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: 'Failed to fetch event. Something went wrong.',
    };
  }
}
