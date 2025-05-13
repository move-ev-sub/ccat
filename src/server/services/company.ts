'use server';

import { GENERAL_ERROR_CODES } from '@/error/codes';
import { Prisma } from '@/generated/prisma/client';
import { messages as t } from '@/i18n';
import { auth } from '@/utils/auth';
import { createClient } from '@/utils/supabase/server';
import { User } from 'better-auth';
import prisma from '../db';
import { withAuth } from '../helpers';
import { ServiceResult } from '../types/serviceResult';
import { createSecurePassword } from './auth';
import { existsBucket } from './storage';

/**
 * Fetches all companies from the database. Only authenticated users can
 * fetch all companies.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [company:fetchAll]
 *
 * @returns A ServiceResult with the companies.
 */
export const getAllCompanies = withAuth<[], User[]>(
  async () => {
    const res = await prisma.user.findMany({
      where: {
        role: {
          contains: 'company',
        },
      },
    });

    if (!res) {
      throw new Error('Failed to fetch companies.');
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      company: ['fetchAll'],
    },
  }
);

/**
 * Returns a single company by its ID from the database. Only authenticated
 * users can fetch a company. Returns an error if the company was not found
 * or if more than one company was found.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [company:fetchSingle]
 *
 * @returns A ServiceResult with the company.
 */
export const getCompanyById = withAuth<
  [
    {
      /**
       * The id of the company to fetch.
       */
      id: string;
    },
  ],
  User
>(
  async ({ args: [{ id }] }) => {
    // Get the company from the database
    const res = await prisma.user.findFirst({
      where: {
        AND: [
          {
            id,
          },
          {
            role: {
              contains: 'company',
            },
          },
        ],
      },
    });

    // If no result was found return an error
    if (!res) {
      throw new Error(GENERAL_ERROR_CODES.UNKNOWN_ERROR);
    }

    return {
      ok: true,
      data: res,
    };
  },
  {
    permissions: {
      company: ['fetchSingle'],
    },
  }
);

/**
 * Creates a new company in the database. Only admins can create new companies.
 * When a new company is created, a new profile is also created for the company
 * and a password is generated. The logo of the company is stored in the storage
 * bucket under `logos/company/[companyId].{png,svg,jpeg}`.
 *
 * @deprecated Use the auth.createUser API instead and set the user role to company.
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
  // Authorization
  const hasPermission = await auth.api.userHasPermission({
    body: {
      permissions: {
        company: ['create'],
      },
    },
  });

  if (!hasPermission.success) {
    return {
      ok: false,
      error: t.errors.notAuthorized(),
    };
  }

  if (!logo.name.includes('.')) {
    return {
      ok: false,
      error: t.errors.invalidFileName(),
    };
  }

  const password = await createSecurePassword();

  try {
    const newUser = await auth.api.createUser({
      body: {
        name: name,
        email: email,
        password: password,
        role: 'company',
      },
    });

    if (!newUser.user) {
      throw new Error('Failed to create user');
    }

    const userId = newUser.user.id;

    // Split the file name at every . and get the last element as the file ending
    const fileEnding = logo.name.split('.').pop();

    // Check if the bucket exists
    if (!(await existsBucket('logos'))) {
      return {
        ok: false,
        error: t.errors.bucketNotFound('logos'),
      };
    }

    const client = await createClient();

    // If the file already exists, delete it first
    if (
      await client.storage
        .from('logos')
        .exists(`company/${userId}.${fileEnding}`)
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
      console.error(logoRes.error.stack);
      return {
        ok: false,
        error: logoRes.error.message || t.errors.logoUploadFailed(),
      };
    }

    return {
      ok: true,
      data: {
        userId,
        password,
      },
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: t.errors.failedToCreate('company'),
    };
  }
}
