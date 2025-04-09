'use server';

import { messages as t } from '@/i18n';
import { createClient } from '@/utils/supabase/server';
import { Event } from '@prisma/client';
import prisma from '../db';
import { NewEventData } from '../schemas/event';
import { ServiceResult } from '../types/serviceResult';
import { getUser, isAdmin, isAuthenticated } from './auth';

/**
 * Returns all published events from the database. Only accessible for
 * authenticated users.
 *
 * @returns A promise with all published events.
 */
export async function getPublishedEvents(): Promise<ServiceResult<Event[]>> {
  const client = await createClient();

  // Only authenticated users can fetch see
  if (!isAuthenticated(client)) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

  // Fetch all events where status is published

  const res = await prisma.event.findMany({
    where: {
      status: 'PUBLISHED',
    },
  });

  if (!res || res.length === 0) {
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
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

  const user = await getUser(client);

  if (user === null) {
    return {
      ok: false,
      error: t.errors.failedToFetch('user'),
    };
  }

  // Only admins can fetch ALL events
  if (!(await isAdmin(client))) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  // TODO: This needs to be optimized
  // When at scale, we should not fetch all events at once
  // but rather paginate the results
  const res = await prisma.event.findMany();

  if (!res || res.length === 0) {
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
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

  // Only admins can create new events
  if (!(await isAdmin(client))) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  const user = await getUser(client);

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
      createdById: user.id,
    },
  });

  if (res === null) {
    return {
      ok: false,
      error: t.errors.notCreated('Unternehmen'),
    };
  }

  return {
    ok: true,
    data: res,
  };
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
  const client = await createClient();

  // Only authenticated users can fetch events
  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

  // Get the event from the database

  const res = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
  });

  // Check if more than one event was found
  if (res === null) {
    return {
      ok: false,
      error: t.errors.eventNotFound(eventId),
    };
  }

  // Only admins can fetch unpublished events
  if (res.status !== 'PUBLISHED' && !(await isAdmin(client))) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  return {
    ok: true,
    data: res,
  };
}

export async function getAllNonArchivedEvents(): Promise<
  ServiceResult<Event[]>
> {
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: t.errors.notAuthenticated(),
    };
  }

  if (!(await isAdmin(client))) {
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
}
