'use server';

import { SubEvent } from '@/generated/prisma/client';
import { messages as t } from '@/i18n';
import prisma from '../db';
import { withAuth } from '../helpers';

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
 *
 * @returns A promise that resolves to a ServiceResult containing either:
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
export const createSubEvent = withAuth<
  [
    {
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
    },
  ],
  SubEvent
>(
  async (
    {
      name,
      startDate,
      endDate,
      eventId,
      maxParticipants,
      description,
      hostId,
      slotId,
    },
    session
  ) => {
    // Check if start date is before end date
    if (startDate >= endDate) {
      throw new Error(t.errors.dateBeforeEnddate());
    }

    // Check if dates are in the future
    if (startDate < new Date() || endDate < new Date()) {
      throw new Error(t.errors.dateNotInFuture());
    }

    // Check if max participants is positive
    if (maxParticipants <= 0) {
      throw new Error(t.errors.maxParticipantsNotPositive());
    }

    const createdById = session.user.id;

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
      throw new Error(t.errors.failedToCreate('Sub Event'));
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      subEvent: ['create'],
    },
  }
);

/**
 * Returns all sub events for a given event.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [subEvent:fetchAll]
 *
 * @todo TODO: Add distinction between published and unpublished sub events
 *
 * @returns All sub events for the given event.
 */
export const getSubEventsForEvent = withAuth<
  [
    {
      eventId: string;
    },
  ],
  SubEvent[]
>(
  async ({ eventId }) => {
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
      throw new Error(t.errors.failedToGet('Sub Events'));
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      subEvent: ['fetchAll'],
    },
  }
);

/**
 * Returns all sub events, where the host company is the currently authenticated
 * user and the main event is published.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [subEvent:fetchOwn]
 *
 * @returns All published and owned sub events.
 */
export const getOwnSubEvents = withAuth<[unknown?], SubEvent[]>(
  async (_, session) => {
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

    if (!res) {
      throw new Error(t.errors.failedToGet('Sub Events'));
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      subEvent: ['fetchOwn'],
    },
  }
);

export const getSubEventsForCompany = withAuth<
  [
    {
      /**
       * The ID of the company to fetch sub events for.
       */
      companyId: string;
    },
  ],
  SubEvent[]
>(
  async ({ companyId }) => {
    const res = await prisma.subEvent.findMany({
      where: {
        hostId: companyId,
      },
    });

    if (!res) {
      throw new Error(t.errors.failedToGet('Sub Events'));
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      subEvent: ['fetchAll'],
    },
  }
);

/**
 * @deprecated Use {@link getSubEventsForCompany} instead.
 */
export const getPublishedSubEventsForCompany = withAuth<
  [
    {
      companyId: string;
    },
  ],
  SubEvent[]
>(
  async ({ companyId }) => {
    const res = await prisma.subEvent.findMany({
      where: {
        hostId: companyId,
        event: {
          status: 'PUBLISHED',
        },
      },
    });

    if (!res) {
      throw new Error(t.errors.failedToGet('Sub Events'));
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      subEvent: ['fetchAll'],
    },
  }
);
