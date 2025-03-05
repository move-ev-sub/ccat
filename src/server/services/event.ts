'use server';

import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { eventsTable } from '../db/schema';
import { NewEventData } from '../schemas/event';
import { EventInsertData, EventSelectResult } from '../types/event';
import { ServiceResult } from '../types/serviceResult';
import { getUser, isAdmin, isAuthenticated } from './auth';

/**
 * Returns all published events from the database. Only accessible for
 * authenticated users.
 *
 * @returns A promise with all published events.
 */
export async function getPublishedEvents(): Promise<
  ServiceResult<EventSelectResult[]>
> {
  const client = await createClient();

  // Only authenticated users can fetch see
  if (!isAuthenticated(client)) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  // Fetch all events where status is published
  const data = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.status, 'published'));

  return {
    ok: true,
    data,
  };
}

/**
 * Returns all events from the database. Only admins can fetch all events.
 *
 * @returns A promise with all events.
 */
export async function getAllEvents(): Promise<
  ServiceResult<EventSelectResult[]>
> {
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  const user = await getUser(client);

  if (user === null) {
    return {
      ok: false,
      error: 'Could not fetch the user object.',
    };
  }

  // Only admins can fetch ALL events
  if (!(await isAdmin(client))) {
    return {
      ok: false,
      error: 'User is not authorized.',
    };
  }

  const data = await db.select().from(eventsTable);

  if (!data) {
    return {
      ok: false,
      error: 'Failed to fetch events.',
    };
  }

  return {
    ok: true,
    data,
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
  status,
}: NewEventData): Promise<ServiceResult<EventSelectResult[]>> {
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  // Only admins can create new events
  if (!(await isAdmin(client))) {
    return {
      ok: false,
      error: 'User is not authorized.',
    };
  }

  const user = await getUser(client);

  if (user === null) {
    return {
      ok: false,
      error: 'Could not fetch the user object.',
    };
  }

  const defaultValues: Partial<EventInsertData> = {
    createdBy: user.id,
    lastUpdated: new Date(Date.now()),
  };

  const res = await db
    .insert(eventsTable)
    .values({
      name,
      status,
      description,
      ...defaultValues,
    })
    .returning();

  if (!res || res.length === 0) {
    return {
      ok: false,
      error: 'Failed to create event in the database.',
    };
  }

  if (res.length > 1) {
    console.warn('More than one event was created.');
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
): Promise<ServiceResult<EventSelectResult>> {
  const client = await createClient();

  // Only authenticated users can fetch events
  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  // Get the event from the database
  const res = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, eventId));

  // Check if more than one event was found
  if (res.length > 1) {
    return {
      ok: false,
      error: 'Failed to fetch event (More than one event was found).',
    };
  }

  const event = res[0];

  // Only admins can fetch unpublished events
  if (event.status !== 'published' && !(await isAdmin(client))) {
    return {
      ok: false,
      error: 'User is not authorized to fetch this event.',
    };
  }

  return {
    ok: true,
    data: event,
  };
}
