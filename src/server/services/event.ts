'use server';

import { AUTH_ERROR_CODES, GENERAL_ERROR_CODES } from '@/error/codes';
import { Event, Phase } from '@/generated/prisma/client';
import { auth } from '@/utils/auth';
import prisma from '../db';
import { withAuth } from '../helpers';

/**
 * Returns all published events from the database. Only accessible for
 * authenticated users.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [authenticated]
 *
 * @returns A promise with all published events.
 */
export const getPublishedEvents = withAuth<[], (Event & { phases: Phase[] })[]>(
  async () => {
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
      throw new Error(GENERAL_ERROR_CODES.UNKNOWN_ERROR);
    }

    return {
      ok: true,
      data: res,
    };
  }
);

/**
 * Returns all events from the database including drafts, archived and
 * published events.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [event:fetchAll]
 *
 * @returns A promise with all events.
 */
export const getAllEvents = withAuth<[], Event[]>(
  async () => {
    const res = await prisma.event.findMany();

    if (!res) {
      throw new Error(GENERAL_ERROR_CODES.UNKNOWN_ERROR);
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

/**
 * Creates a new event in the database. Only admins can create new events.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [event:create]
 *
 * @param name The name of the event.
 * @param description The description of the event.
 * @param status The status of the event.
 *
 * @returns A promise with the created event.
 */
export const createEvent = withAuth<
  [
    {
      name: string;
      description: string;
    },
  ],
  Event
>(
  async ({ args: [{ name, description }], session }) => {
    const res = await prisma.event.create({
      data: {
        name,
        description,
        status: 'DRAFT',
        createdById: session.user.id,
      },
    });

    if (!res) {
      throw new Error(GENERAL_ERROR_CODES.UNKNOWN_ERROR);
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      event: ['create'],
    },
  }
);

/**
 * Returns a single event from the database by its ID. If multiple events
 * are found, a warning is logged and no event is returned.
 *
 * If the event is not published and the user is not an admin, the event
 * will not be returned.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [event:fetchPublished]
 * @requires {permission} [event:fetchAll] - For unpublished events
 *
 * @param eventId - The ID of the event to fetch.
 *
 * @returns A promise with the event.
 */
export const getEventById = withAuth<[string], Event>(
  async ({ args: [eventId] }) => {
    const res = await prisma.event.findUniqueOrThrow({
      where: {
        id: eventId,
      },
    });

    if (!res) {
      throw new Error(GENERAL_ERROR_CODES.UNKNOWN_ERROR);
    }

    if (res.status !== 'PUBLISHED') {
      const hasPermission = await auth.api.userHasPermission({
        body: {
          permissions: {
            event: ['fetchAll'],
          },
        },
      });

      if (!hasPermission) {
        throw new Error(AUTH_ERROR_CODES.USER_NOT_AUTHORIZED);
      }
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      event: ['fetchPublished'],
    },
  }
);

/**
 * Returns all non-archived events from the database. Only accessible for
 * admins.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [event:fetchAll]
 *
 * @returns A promise with all non-archived events.
 */
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

interface EventWithPhases extends Event {
  phases: Phase[];
}

/**
 * Returns a published event from the database by its ID. Only accessible for
 * admins.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [event:fetchPublished]
 *
 * @param eventId - The ID of the event to fetch.
 *
 * @returns A promise with the event.
 */
export const getPublishedEventById = withAuth<
  [
    {
      eventId: string;
    },
  ],
  EventWithPhases
>(
  async ({ args: [{ eventId }] }) => {
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
      throw new Error('Event has no application phase.');
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      event: ['fetchPublished'],
    },
  }
);
