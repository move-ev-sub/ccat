import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { eventsTable, profilesTable } from '../db/schema';
import { EventSelectResult } from '../types/event';
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
