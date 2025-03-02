'use server';

import * as companyService from '@/server/services/company';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';
import { companyProfilesTable } from '../db/schema';
import { newCompanySchema } from '../schemas/company';
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

export async function createCompany(
  props: z.infer<typeof newCompanySchema>
): Promise<ActionResponse<{ id: string; password: string }>> {
  const parseResult = newCompanySchema.safeParse(props);

  if (!parseResult.success) {
    return {
      status: 'error',
      error:
        parseResult.error.errors[0].message ||
        'Ein unbekannter Fehler ist aufgetreten.',
    };
  }

  const { email, logo, name } = props;

  const res = await companyService.createCompany(name, email, logo[0]);

  if (!res.ok) {
    return {
      status: 'error',
      error: res.error || 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }

  return {
    status: 'success',
    data: {
      id: res.data.userId,
      password: res.data.password,
    },
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
