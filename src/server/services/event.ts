'use server';

import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { eventsTable, profilesTable } from '../db/schema';
import { NewEventData } from '../schemas/event';
import { EventInsertData, EventSelectResult } from '../types/event';
import { ServiceResult } from '../types/serviceResult';

export async function getAllEvents(): Promise<
  ServiceResult<EventSelectResult[]>
> {
  const client = await createClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  // Only authenticated users can fetch all events
  if (!user || user.id === null) {
    return {
      status: 'error',
      error: 'User is not authenticated.',
      data: [],
    };
  }

  // Only admins can fetch ALL events
  const profile = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.id, user.id),
  });

  if (!profile || profile.profileType !== 'admin') {
    return {
      status: 'error',
      error: 'User is not authorized.',
      data: [],
    };
  }

  const res = await db.select().from(eventsTable);

  if (!res) {
    return {
      status: 'error',
      error: 'Failed to fetch events.',
      data: [],
    };
  }

  return {
    status: 'success',
    data: [...res],
  };
}

export async function createEvent({
  name,
  status,
  description,
}: NewEventData): Promise<ServiceResult<EventSelectResult[]>> {
  const client = await createClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  // Only authenticated users can create events
  if (!user || user.id === null) {
    return {
      status: 'error',
      error: 'User is not authenticated.',
      data: [],
    };
  }

  // Only admins can create new events
  const profile = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.id, user.id),
  });

  if (!profile || profile.profileType !== 'admin') {
    return {
      status: 'error',
      error: 'User is not authorized.',
      data: [],
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
      status: 'error',
      error: 'Failed to create event.',
    };
  }

  if (res.length > 1) {
    console.warn('More than one event was created.');
  }

  return {
    status: 'success',
    data: res,
  };
}
