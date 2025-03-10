'use server';

import { createClient } from '@/utils/supabase/server';
import { Slot } from '@prisma/client';
import prisma from '../db';
import { ServiceResult } from '../types/serviceResult';
import { getUser, isAdmin, isAuthenticated } from './auth';

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
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  if (!(await isAdmin(client))) {
    return {
      ok: false,
      error: 'User is not authorized to create a slot.',
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
      error: 'Event not found.',
    };
  }

  // Check if the start date is before the end date.
  if (startDate >= endDate) {
    return {
      ok: false,
      error: 'Start date must be before end date.',
    };
  }

  const user = await getUser();

  if (!user) {
    return {
      ok: false,
      error: 'User not found.',
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
      error: 'Failed to create slot.',
    };
  }

  return {
    ok: true,
    data: res,
  };
}
