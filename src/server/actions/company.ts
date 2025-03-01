'use server';

import { createClient } from '@/utils/supabase/server';
import { companyProfilesTable } from '../db/schema';
import { getAllCompanies } from '../services/company';
import { ActionResponse } from '../types/action-response';

export async function getCompanies(): Promise<
  ActionResponse<(typeof companyProfilesTable.$inferSelect)[]>
> {
  const res = await getAllCompanies();

  if (!res.ok) {
    return {
      status: 'error',
      error: res.error || 'Ein unbekannter Fehler ist aufgetreten.',
      data: [],
    };
  }

  return {
    status: 'success',
    data: res.data,
  };
}

export async function uploadTestFile(file: File) {
  const supabase = await createClient();

  console.log(file);

  const { data, error } = await supabase.storage
    .from('test')
    .upload(file.name, file, {
      cacheControl: '3600',
      upsert: false,
    });

  console.log(data, error);
}
