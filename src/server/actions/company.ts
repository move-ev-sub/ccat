'use server';

import * as companyService from '@/server/services/company';
import { z } from 'zod';
import { newCompanySchema } from '../schemas/company';
import { getAllCompanies } from '../services/company';
import { ActionResponse } from '../types/action-response';
import { FullCompanyProfile } from '../types/profile';

export async function getCompanies(): Promise<
  ActionResponse<FullCompanyProfile[]>
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
