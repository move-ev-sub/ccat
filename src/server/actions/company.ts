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
