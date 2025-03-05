'use server';

import { createAdminClient, createClient } from '@/utils/supabase/server';
import { prisma } from '../db';
import { FullCompanyProfile } from '../types/profile';
import { ServiceResult } from '../types/serviceResult';
import { createSecurePassword, isAdmin, isAuthenticated } from './auth';
import { existsBucket } from './storage';

/**
 * Fetches all companies from the database. Only authenticated users can
 * fetch all companies.
 *
 * @returns
 */
export async function getAllCompanies(): Promise<
  ServiceResult<FullCompanyProfile[]>
> {
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  const res = await prisma.profile.findMany({
    where: {
      role: 'COMPANY',
    },
    include: {
      companyProfile: true,
    },
  });

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
): Promise<ServiceResult<FullCompanyProfile>> {
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  // Get the company from the database
  const res: FullCompanyProfile | null = await prisma.profile.findFirst({
    where: {
      AND: [
        {
          id: companyId,
        },
        {
          role: 'COMPANY',
        },
      ],
    },
    include: {
      companyProfile: true,
    },
  });

  // If more than one company was found return an error
  if (res === null) {
    return {
      ok: false,
      error: 'Failed to fetch company profile.',
    };
  }

  return {
    ok: true,
    data: res,
  };
}

/**
 * Creates a new company in the database. Only admins can create new companies.
 * When a new company is created, a new profile is also created for the company
 * and a password is generated. The logo of the company is stored in the storage
 * bucket under `logos/company/[companyId].{png,svg,jpeg}`.
 *
 * @returns ServiceResult with an object that contains the new company's ID and
 * the password for the new company. If the creation fails, an error is returned.
 */
export async function createCompany(
  name: string,
  email: string,
  logo: File
): Promise<
  ServiceResult<{
    userId: string;
    password: string;
  }>
> {
  const client = await createClient();

  // Only authenticated users can create new companies
  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  // Only admins can create new companies
  if (!(await isAdmin(client))) {
    return {
      ok: false,
      error: 'User is not an admin.',
    };
  }

  if (!logo.name.includes('.')) {
    return {
      ok: false,
      error: 'Invalid file name.',
    };
  }

  const password = await createSecurePassword();

  // The admin client is ONLY used to create a new user
  // After the user is created, the admin client is no longer needed
  // and the regular client is used to interact with the database
  const adminClient = await createAdminClient();

  // Create a new user
  const { data, error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Automatically confirm the email,
    user_metadata: {
      compay_name: name,
    },
  });

  // When no user was created, return an error
  if (!data.user) {
    return {
      ok: false,
      error: error?.message || 'Failed to create company user account.',
    };
  }

  const {
    user: { id: userId },
  } = data;

  // Create a new profile

  const profileRes = await prisma.profile.create({
    data: {
      id: userId,
      role: 'COMPANY',
      companyProfile: {
        create: {
          name,
        },
      },
    },
  });

  if (!profileRes) {
    const err =
      '[High Severity] Failed to create company profile but user account was created. This needs manual intervention since there now exists a user account without a profile!';
    console.error(err);
    return {
      ok: false,
      error:
        '[High Severity] Failed to create company profile but user account was created. This needs manual intervention since there now exists a user account without a profile!',
    };
  }

  // Split the file name at every . and get the last element as the file ending
  const fileEnding = logo.name.split('.').pop();

  // Check if the bucket exists
  if (!(await existsBucket('logos'))) {
    return {
      ok: false,
      error: 'The bucket "logos" does not exist.',
    };
  }

  // If the file already exists, delete it first
  if (
    await client.storage.from('logos').exists(`company/${userId}.${fileEnding}`)
  ) {
    await client.storage
      .from('logos')
      .remove([`company/${userId}.${fileEnding}`]);
  }

  // Upload the logo to the storage bucket
  const logoRes = await client.storage
    .from('logos')
    .upload(`company/${userId}.${fileEnding}`, logo, {
      cacheControl: '3600',
      upsert: false,
    });

  if (logoRes.error || logoRes.data == null) {
    console.error(logoRes.error);
    return {
      ok: false,
      error: logoRes.error.message || 'Failed to upload logo.',
    };
  }

  return {
    ok: true,
    data: {
      userId,
      password,
    },
  };
}
