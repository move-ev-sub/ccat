import { User as PrismaUser } from '@/generated/prisma/client';
import { auth } from '@/lib/api/auth';
import prisma from '@/lib/api/prisma';
import { CCATError } from '@/lib/error';
import { GENERAL_ERROR_CODES } from '@/lib/error/codes';
import { withAuth } from '@/lib/helpers/withAuth';
import { UserWithRole } from 'better-auth/plugins';
import { CreateUserArgs, GetUserByIdArgs } from '../types';
import { createUserSchema, getUserByIdSchema } from '../validations';
/**
 * Returns the user with the given id. Throws an error if no user with the given
 * id exists.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [userProfile:fetchAll]
 *
 * @returns A ServiceResult with the user.
 */
export const getUserById = withAuth<[GetUserByIdArgs], PrismaUser>(
  async ({ args: [arg0] }) => {
    const parseRes = getUserByIdSchema.safeParse(arg0);

    if (!parseRes.success) {
      throw new Error(parseRes.error.message);
    }

    const { id } = parseRes.data;

    const res = await prisma.user.findUniqueOrThrow({
      where: { id },
    });

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
      userProfile: ['fetchAll'],
    },
  }
);

/**
 * Returns all users from the database.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [userProfile:fetchAll]
 *
 * @returns A ServiceResult with the users from the database.
 */
export const getUsers = withAuth<[], PrismaUser[]>(
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
      userProfile: ['fetchAll'],
    },
  }
);

/**
 * Creates a new user with the given email, first name, last name, role and password.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * has the required permissions.
 *
 * @requires {permission} [user:create]
 *
 * @returns A ServiceResult with the created user.
 */
export const createUser = withAuth<[CreateUserArgs], UserWithRole>(
  async ({ args: [arg0] }) => {
    const parseRes = createUserSchema.safeParse(arg0);

    if (!parseRes.success) {
      throw new Error(parseRes.error.message);
    }

    const { email, firstName, lastName, role, password } = parseRes.data;

    const res = await auth.api.createUser({
      body: {
        email,
        password,
        role,
        name: firstName,
        data: {
          firstName,
          lastName,
          emailReminders: false,
          notifyMe: false,
        },
      },
    });

    if (!res) {
      throw new Error(GENERAL_ERROR_CODES.UNKNOWN_ERROR);
    }

    return {
      ok: true,
      data: res.user,
    };
  },
  {
    permissions: {
      user: ['create'],
    },
  }
);
