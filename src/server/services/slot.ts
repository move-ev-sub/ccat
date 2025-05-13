'use server';

import { Slot } from '@/generated/prisma/client';
import { messages as t } from '@/i18n';
import prisma from '../db';
import { withAuth } from '../helpers';

/**
 * Creates a new Time Slot for an Event in which sub events can be
 * placed. This is only available to Admins.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [slot:create]
 *
 * @returns The created slot.
 */

export const createSlot = withAuth<
  [
    {
      eventId: string;
      startDate: Date;
      endDate: Date;
    },
  ],
  Slot
>(
  async ({ eventId, startDate, endDate }, session) => {
    const existsEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        id: true,
      },
    });

    if (!existsEvent) {
      throw new Error(t.errors.eventNotFound(eventId));
    }

    // Check if the start date is before the end date.
    if (startDate >= endDate) {
      throw new Error(t.errors.dateBeforeEnddate());
    }

    // areSameDay checks if two dates are on the same calendar day.
    //
    // TODO: move this to a shared utility function since this is
    // also used in other places.
    const areSameDay = (date1: Date, date2: Date): boolean => {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };

    if (!areSameDay(startDate, endDate)) {
      throw new Error(t.errors.notSameDay());
    }

    const res = await prisma.slot.create({
      data: {
        endDate,
        startDate,
        eventId,
        createdById: session.user.id,
      },
    });

    if (!res) {
      throw new Error(t.errors.failedToCreate('Slots'));
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      slot: ['create'],
    },
  }
);

/**
 * Gets all slots for a given event.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [slot:fetchAll]
 *
 * @returns The slots for the event.
 */
export const getSlotsForEvent = withAuth<
  [
    {
      eventId: string;
    },
  ],
  Slot[]
>(
  async ({ eventId }) => {
    const res = await prisma.slot.findMany({
      where: {
        eventId: eventId,
      },
    });

    if (!res) {
      throw new Error(t.errors.failedToGet('Slots'));
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      slot: ['fetchAll'],
    },
  }
);
