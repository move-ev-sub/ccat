'use server';

import { countSlotsForEvent } from '@/features/slot/services/slotService';
import { countCompanyUsers } from '@/features/user/services/companyService';
import { SubEvent } from '@/generated/prisma/client';
import { messages as t } from '@/i18n';
import prisma from '@/lib/api/prisma';
import { withAuth } from '@/lib/helpers/withAuth';
import {
  CanCreateSubEventArgs,
  CreateSubEventArgs,
  GetPublishedSubEventsForCompanyArgs,
  GetSubEventsForCompanyArgs,
  GetSubEventsForEventArgs,
} from '../types';
import {
  canCreateSubEventSchema,
  createSubEventSchema,
  getPublishedSubEventsForCompanySchema,
  getSubEventsForCompanySchema,
  getSubEventsForEventSchema,
} from '../validations';

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
export const createSubEvent = withAuth<[CreateSubEventArgs], SubEvent>(
  async ({ args: [arg0], session }) => {
    const parseRes = await createSubEventSchema.safeParseAsync(arg0);

    if (!parseRes.success) {
      throw new Error(parseRes.error.message);
    }

    const {
      name,
      startDate,
      endDate,
      eventId,
      maxParticipants,
      description,
      hostId,
      slotId,
    } = parseRes.data;

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
  [GetSubEventsForEventArgs],
  SubEvent[]
>(
  async ({ args: [arg0] }) => {
    const parseRes = await getSubEventsForEventSchema.safeParseAsync(arg0);

    if (!parseRes.success) {
      throw new Error(parseRes.error.message);
    }

    const { eventId } = parseRes.data;

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
  async ({ session }) => {
    const id = session.user.id;

    // Fetch all sub events, where the host company is the currently authenticated
    // user and the main event is published.
    const res = await prisma.subEvent.findMany({
      where: {
        AND: [
          {
            hostId: id,
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
  [GetSubEventsForCompanyArgs],
  SubEvent[]
>(
  async ({ args: [arg0] }) => {
    const parseRes = await getSubEventsForCompanySchema.safeParseAsync(arg0);

    if (!parseRes.success) {
      throw new Error(parseRes.error.message);
    }

    const { companyId } = parseRes.data;

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
  [GetPublishedSubEventsForCompanyArgs],
  SubEvent[]
>(
  async ({ args: [arg0] }) => {
    const parseRes =
      await getPublishedSubEventsForCompanySchema.safeParseAsync(arg0);

    if (!parseRes.success) {
      throw new Error(parseRes.error.message);
    }

    const { companyId } = parseRes.data;

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

/**
 * Checks if a sub event can be created for a given event. The criteria are:
 * - The event has at least one slot
 * - At least one company user exists
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [subEvent:create]
 *
 * @returns A promise that resolves to a ServiceResult containing either:
 * - true if a sub event can be created
 * - false otherwise
 */
export const canCreateSubEvent = withAuth<[CanCreateSubEventArgs], boolean>(
  async ({ args: [arg0] }) => {
    const parseRes = await canCreateSubEventSchema.safeParseAsync(arg0);

    if (!parseRes.success) {
      throw new Error(parseRes.error.message);
    }

    const { eventId } = parseRes.data;

    const companyCountRes = await countCompanyUsers();

    if (!companyCountRes.ok) {
      throw new Error(companyCountRes.error);
    }

    const slotCountRes = await countSlotsForEvent({
      eventId,
    });

    if (!slotCountRes.ok) {
      throw new Error(slotCountRes.error);
    }

    const { data: slotCount } = slotCountRes;
    const { data: companyCount } = companyCountRes;

    if (slotCount >= 1 && companyCount >= 1) {
      return {
        ok: true,
        data: true,
      };
    }

    return {
      ok: true,
      data: false,
    };
  },
  {
    permissions: {
      subEvent: ['create'],
    },
  }
);
