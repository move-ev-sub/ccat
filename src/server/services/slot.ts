'use server';

import { Slot } from '@/generated/prisma/client';
import { messages as t } from '@/i18n';
import { auth } from '@/utils/auth';
import prisma from '../db';
import { ServiceResult } from '../types/serviceResult';
import { getUser } from './auth';

/**
 * Creates a new Time Slot for an Event in which sub events can be
 * placed. This is only available to Admins.
 *
 * @param {string} [eventId] The ID of the Event to create the Slot for.
 * @param {Date} [startDate] The start date of the Slot.
 * @param {Date} [endDate] The end date of the Slot.
 */
export async function createSlot(
  eventId: string,
  startDate: Date,
  endDate: Date
): Promise<ServiceResult<Slot>> {
  const hasPermission = await auth.api.userHasPermission({
    body: {
      permissions: {
        slot: ['create'],
      },
    },
  });

  if (!hasPermission.success) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  const existsEvent = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    select: {
      id: true,
    },
  });

  if (!existsEvent) {
    return {
      ok: false,
      error: t.errors.eventNotFound(eventId),
    };
  }

  // Check if the start date is before the end date.
  if (startDate >= endDate) {
    return {
      ok: false,
      error: t.errors.dateBeforeEnddate(),
    };
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
    return {
      ok: false,
      error: t.errors.notSameDay(),
    };
  }

  const user = await getUser();

  if (!user) {
    return {
      ok: false,
      error: t.errors.userNotFoundGeneric(),
    };
  }

  const res = await prisma.slot.create({
    data: {
      endDate,
      startDate,
      eventId,
      createdById: user.id,
    },
  });

  if (!res) {
    return {
      ok: false,
      error: t.errors.failedToCreate('Slots'),
    };
  }

  return {
    ok: true,
    data: res,
  };
}

/**
 * Gets all slots for a given event.
 */
export async function getSlotsForEvent(
  eventId: string
): Promise<ServiceResult<Slot[]>> {
  try {
    const hasPermission = await auth.api.userHasPermission({
      body: { permissions: { slot: ['fetchAll'] } },
    });

    if (!hasPermission.success) {
      throw new Error('Not authorized');
    }

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
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: 'Unknown error',
    };
  }
}
