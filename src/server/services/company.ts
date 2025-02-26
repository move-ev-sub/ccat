'use server';

import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { companyProfilesTable } from '../db/schema';
import { ServiceResult } from '../types/serviceResult';
import { isAuthenticated } from './auth';

/**
 * Fetches all companies from the database. Only authenticated users can
 * fetch all companies.
 *
 * @returns
 */
export async function getAllCompanies(): Promise<
  ServiceResult<(typeof companyProfilesTable.$inferSelect)[]>
> {
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  const res = await db.select().from(companyProfilesTable);

  // Check if any companies were found
  if (res.length === 0) {
    return {
      ok: false,
      error: 'No companies found.',
    };
  }

  return {
    ok: true,
    data: res,
  };
}

/**
 * Returns a single company by its ID from the database. Only authenticated
 * users can fetch a companies. Returns an error if the company was not found
 * or if more than one company was found.
 *
 * @param companyId
 * @returns
 */
export async function getCompanyById(
  companyId: string
): Promise<ServiceResult<typeof companyProfilesTable.$inferSelect>> {
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  // Get the company from the database
  const res = await db
    .select()
    .from(companyProfilesTable)
    .where(eq(companyProfilesTable.id, companyId));

  // If more than one company was found return an error
  if (!res || res.length >= 1) {
    return {
      ok: false,
      error: 'Failed to fetch company (More than one company was found).',
    };
  }

  return {
    ok: true,
    data: res[0],
  };
}
