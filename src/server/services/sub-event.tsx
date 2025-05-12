'use server';

import { SubEvent } from '@/generated/prisma/client';
import { messages as t } from '@/i18n';
import { auth } from '@/utils/auth';
import { headers } from 'next/headers';
import { validate as uuidValidate } from 'uuid';
import prisma from '../db';
import { ServiceResult } from '../types/serviceResult';
import { isAuthenticated } from './auth';

/**
 * The parameters for creating a sub-event.
 *
 * @see {@link createSubEvent}
 */
interface CreateSubEventParams {
  /**
   * The name of the sub-event
   */
  name: string;
  /**
   * The start date of the sub-event
   */
  startDate: Date;
  /**
   * The end date of the sub-event
   */
  endDate: Date;
  /**
   * The UUID of the parent event
   */
  eventId: string;
  /**
   * The maximum number of participants allowed for the sub-event
   */
  maxParticipants: number;
  /**
   * The description of the sub-event
   */
  description?: string;
  /**
   * The UUID of the host company
   */
  hostId: string;
  /**
   * The UUID of the slot
   */
  slotId: string;
}

/**
 * Creates a new sub-event within an existing event.
 *
 * This function handles the creation of a sub-event with various validations:
 * - Validates the event ID format
 * - Ensures the start date is before the end date
 * - Verifies that max participants is a positive number
 * - Checks if the user has admin privileges
 *
 * @example
 * ```typescript
 * const result = await createSubEvent({
 *   name: "Workshop with Company",
 *   startDate: new Date("2024-03-20T10:00:00"),
 *   endDate: new Date("2024-03-20T11:00:00"),
 *   eventId: "123e4567-e89b-12d3-a456-426614174000",
 *   maxParticipants: 25,
 *   description: "An interactive workshop session"
 * });
 *
 * if (result.ok) {
 *   console.log("Sub-event created:", result.data);
 * } else {
 *   console.error("Failed to create sub-event:", result.error);
 * }
 * ```
 *
 * @param {Object} params - The parameters for creating a sub-event
 * @param {string} params.name - The name of the sub-event
 * @param {Date} params.startDate - The start date and time of the sub-event
 * @param {Date} params.endDate - The end date and time of the sub-event
 * @param {string} params.eventId - The UUID of the parent event
 * @param {number} params.maxParticipants - The maximum number of participants allowed
 * @param {string} [params.description] - Optional description of the sub-event
 *
 * @returns {Promise<ServiceResult<SubEvent>>} A promise that resolves to a ServiceResult containing either:
 * - The created SubEvent object if successful
 * - An error message if the creation fails
 *
 * @throws {Error} If the database operation fails
 *
 * @remarks
 * - Only admin users can create sub-events
 * - The function automatically sets the createdById to the current user's ID
 * - The created sub-event will be associated with the specified event
 * - The function uses Prisma for database operations
 * - All dates are stored in UTC format
 */
export async function createSubEvent({
  name,
  startDate,
  endDate,
  eventId,
  maxParticipants,
  description,
  hostId,
  slotId,
}: CreateSubEventParams): Promise<ServiceResult<SubEvent>> {
  const hasPermission = await auth.api.userHasPermission({
    body: {
      permissions: {
        subEvent: ['create'],
      },
    },
  });

  if (!hasPermission.success) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  // Check if start date is before end date
  if (startDate >= endDate) {
    return {
      ok: false,
      error: t.errors.dateBeforeEnddate(),
    };
  }

  // Check if dates are in the future
  if (startDate < new Date() || endDate < new Date()) {
    return {
      ok: false,
      error: t.errors.dateNotInFuture(),
    };
  }

  // Check if max participants is positive
  if (maxParticipants <= 0) {
    return {
      ok: false,
      error: t.errors.maxParticipantsNotPositive(),
    };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      ok: false,
      error: t.errors.failedToFetch('session'),
    };
  }

  const createdById = session.user.id;

  try {
    const res = await prisma.subEvent.create({
      data: {
        name,
        startDate,
        endDate,
        eventId,
        createdById,
        maxParticipants,
        description,
        hostId,
        slotId,
      },
    });

    if (!res) {
      return {
        ok: false,
        error: t.errors.failedToCreate('Sub Event'),
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
        error: t.errors.failedToCreate('Sub Event') + error.message,
      };
    }

    console.log('Type of error', typeof error);

    return {
      ok: false,
      error: t.errors.failedToCreate('Sub Event') + error,
    };
  }
}

// TODO: Add distinction between published and unpublished sub events
export async function getSubEventsForEvent({
  eventId,
}: {
  eventId: string;
}): Promise<ServiceResult<SubEvent[]>> {
  // Only authenticated users can get sub events
  const hasPermission = await auth.api.userHasPermission({
    body: {
      permissions: {
        subEvent: ['fetchAll'],
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
    const res = await prisma.subEvent.findMany({
      where: {
        AND: [
          {
            eventId,
          },
          // {
          //   event: {
          //     status: 'PUBLISHED',
          //   },
          // },
        ],
      },
    });

    if (!res) {
      return {
        ok: false,
        error: t.errors.failedToGet('Sub Events'),
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
        error: t.errors.failedToGet('Sub Events') + error.message,
      };
    }
    return {
      ok: false,
      error: t.errors.failedToGet('Sub Events') + error,
    };
  }
}

interface GetPublishedSubEventsForCompanyParams {
  companyId: string;
}

/**
 * Returns all sub events, where the host company is the currently authenticated
 * user and the main event is published.
 *
 * @returns All published and owned sub events.
 */
export async function getOwnSubEvents(): Promise<ServiceResult<SubEvent[]>> {
  try {
    // Get the current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // When no session if present, abort
    if (!session) {
      throw new Error('User is not authenticated. No session was found.');
    }

    // Check if user has permission to fetch own sub events
    const hasPermission = await auth.api.userHasPermission({
      body: {
        permissions: {
          subEvent: ['fetchOwn'],
        },
      },
    });

    if (!hasPermission.success) {
      throw new Error('User does not have permission to fetch own sub events.');
    }

    const id = session.user.id;

    // Fetch all sub events, where the host company is the currently authenticated
    // user and the main event is published.
    const res = await prisma.subEvent.findMany({
      where: {
        AND: [
          {
            id,
          },
          {
            event: {
              status: 'PUBLISHED',
            },
          },
        ],
      },
    });

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: t.errors.failedToGet('Sub Events') + error.message,
      };
    }

    return {
      ok: false,
      error: t.errors.failedToGet('Sub Events') + error,
    };
  }
}

interface GetSubEventsForCompanyParams {
  /**
   * The ID of the company to fetch sub events for.
   */
  companyId: string;
}

/**
 * Returns all sub events for a given company. This function should only be
 * called by admins.
 *
 * @returns All sub events for the given company.
 */
export async function getSubEventsForCompany({
  companyId,
}: GetSubEventsForCompanyParams): Promise<ServiceResult<SubEvent[]>> {
  try {
    const hasPermission = await auth.api.userHasPermission({
      body: {
        permissions: {
          subEvent: ['fetchAll'],
        },
      },
    });

    if (!hasPermission.success) {
      throw new Error('User does not have permission to fetch sub events.');
    }

    const res = await prisma.subEvent.findMany({
      where: {
        hostId: companyId,
      },
    });

    if (!res) {
      throw new Error('Failed to fetch sub events for company.');
    }

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: t.errors.failedToGet('Sub Events') + error.message,
      };
    }

    return {
      ok: false,
      error: t.errors.failedToGet('Sub Events') + error,
    };
  }
}

export async function getPublishedSubEventsForCompany({
  companyId,
}: GetPublishedSubEventsForCompanyParams): Promise<ServiceResult<SubEvent[]>> {
  // Only authenticated users can get sub events
  if (!(await isAuthenticated())) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

  // Check if company ID is valid
  if (!uuidValidate(companyId)) {
    return {
      ok: false,
      error: t.errors.invalidUUID(companyId),
    };
  }

  const res = await prisma.subEvent.findMany({
    where: {
      AND: [
        {
          hostId: companyId,
        },
        {
          event: {
            status: 'PUBLISHED',
          },
        },
      ],
    },
  });

  if (!res) {
    return {
      ok: false,
      error: t.errors.failedToGet('Sub Events'),
    };
  }

  return {
    ok: true,
    data: res,
  };
}
