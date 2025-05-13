import { User as PrismaUser } from '@/generated/prisma/client';
import prisma from '@/lib/api/prisma';
import { CCATError } from '@/lib/error';
import { GENERAL_ERROR_CODES } from '@/lib/error/codes';
import { withAuth } from '@/lib/helpers/withAuth';
/**
 *
 * Returns all company users from the database.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [company:fetchAll]
 *
 * @returns A ServiceResult with the users from the database.
 */
export const getAllCompanies = withAuth<[], PrismaUser[]>(
  async () => {
    const res = await prisma.user.findMany();

    if (!res) {
      throw new CCATError(GENERAL_ERROR_CODES.UNKNOWN_ERROR);
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
