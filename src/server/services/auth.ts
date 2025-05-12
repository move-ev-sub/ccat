'use server';

import { User as PrismaUser, Role } from '@/generated/prisma/client';
import { auth } from '@/utils/auth';
import { createClient } from '@/utils/supabase/server';
import type { SupabaseClient } from '@supabase/supabase-js';

import { User } from 'better-auth';
import { UserWithRole } from 'better-auth/plugins';
import { randomBytes } from 'crypto';
import { headers } from 'next/headers';
import prisma from '../db';
import { passwordSchema } from '../schemas/auth';
import { ServiceResult } from '../types/serviceResult';

interface SignUpWithEmailArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptLegal: boolean;
}

/**
 * Signs up a new user with email and password.
 *
 * @param firstName - The first name of the user.
 * @param lastName - The last name of the user.
 * @param email - The email of the user.
 * @param password - The password of the user.
 *
 * @returns A promise with the status of the sign up.
 */
export async function signUpWithEmail(
  args: SignUpWithEmailArgs
): Promise<ServiceResult<void>> {
  const { firstName, lastName, email, password } = args;

  const parseRes = await passwordSchema.safeParseAsync(password);

  if (!parseRes.success) {
    return {
      ok: false,
      error: parseRes.error.message,
    };
  }

  if (!firstName || !lastName || !email || !password) {
    return {
      ok: false,
      error: 'Your full Name, email and password are required for signup.',
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        firstName,
        lastName,
        name: firstName,
        emailReminders: false,
        notifyMe: false,
      },
    });

    return { ok: true, data: undefined };
  } catch (error) {
    console.error('Error when signing up with email:', error);
    return {
      ok: false,
      error: 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }
}

/**
 * Signs in a user with email and password using the Supabase auth client.
 *
 * @param email - The email of the user.
 * @param password - The password of the user.
 *
 * @returns A promise with the status of the sign in.
 */
export async function signInWithPassword(
  email: string,
  password: string
): Promise<ServiceResult<void>> {
  if (!email || !password) {
    console.log('Error when logging in: Email and password are required.');
    return {
      ok: false,
      error: 'Email and password are required.',
    };
  }

  // TODO: Check if the supabase client exists -> Optional

  if (await isAuthenticated()) {
    return {
      ok: false,
      error: 'User is already authenticated.',
    };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      ok: true,
      data: undefined,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }

  // Sign in with email and password
  // const { error, data } = await client.auth.signInWithPassword({
  //   email,
  //   password,
  // });

  // if (error) {
  //   return {
  //     ok: false,
  //     error: error.message,
  //   };
  // }

  // return { ok: true, data };
}

/**
 * Signs the current user out.
 *
 * @param client
 * @returns
 */
export async function signOut(client?: SupabaseClient): Promise<undefined> {
  if (!client) {
    client = await createClient();
  }

  // Only authenticated users can sign out
  if (!(await isAuthenticated())) {
    return;
  }

  client.auth.signOut();
}

/**
 * Returns the current user object.
 *
 * @returns The current user object.
 *
 * @deprecated Use the user object provided by the better auth session instead.
 */
export async function getUser(): Promise<User | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return session.user;
}

/**
 * Checks if the current user is authenticated by checking if the
 * supabase auth client returns a valid user object.
 *
 * @returns boolean - `false` if the user is not authenticated, `true` if the user is authenticated.
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();

  return user !== null && user.id !== null;
}

/**
 * Checks if the current user is an admin.
 *
 * @returns boolean - `false` if the user is not an admin, `true` if the user is an admin.
 *
 * @deprecated Use the permissions provided by better auth instead.
 */
export async function isAdmin(): Promise<ServiceResult<boolean>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  if (session.user.role === 'admin') {
    return {
      ok: true,
      data: true,
    };
  }

  return {
    ok: false,
    error: 'User is not an admin.',
  };
}

/**
 * Creates a secure password. This is used for when company accounts
 * are created.
 *
 * @param {number} [length=16] The length of the password in characters.
 *
 * @returns {string} A secure password string.
 */
export async function createSecurePassword(
  length: number = 16
): Promise<string> {
  const pw = randomBytes(length)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric characters
    .slice(0, length); // Trim to the desired length

  return pw;
}

/**
 * Returns the Role of the current user. If no user is found, an error
 * is returned.
 *
 * @returns {ServiceResult<Role>} The Role of the current user.
 *
 * @deprecated Use the permissions provided by better auth instead. This function
 * will be removed in the future and is currently only implemented for backwards
 * compatibility.
 */
export async function getCurrentRole(): Promise<ServiceResult<Role>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  switch (session.user.role) {
    case 'admin':
      return {
        ok: true,
        data: 'ADMIN',
      };
    case 'company':
      return {
        ok: true,
        data: 'COMPANY',
      };
    default:
      return {
        ok: true,
        data: 'USER',
      };
  }
}

interface UpdateOwnSettingsArgs {
  firstName: string;
  lastName: string;
  notifyMe: boolean;
  emailReminders: boolean;
}

/**
 * Updates the first name and last name fields of the current user.
 *
 * @param firstName - The first name of the user.
 * @param lastName - The last name of the user.
 *
 * @returns A promise with the status of the update. True if the update was
 * successful, false otherwise.
 */
export async function updateOwnSettings({
  firstName,
  lastName,
  notifyMe,
  emailReminders,
}: UpdateOwnSettingsArgs): Promise<ServiceResult<void>> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error('User is not authenticated.');
    }

    const res = await auth.api.updateUser({
      headers: await headers(),
      body: {
        firstName,
        lastName,
        notifyMe,
        emailReminders,
      },
    });

    if (!res) {
      throw new Error('Failed to update user.');
    }

    console.log(res);

    return {
      ok: true,
      data: undefined,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message ?? 'Ein unbekannter Fehler ist aufgetreten.',
      };
    }

    return {
      ok: false,
      error: 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }
}

interface RequestPasswordResetArgs {
  email: string;
}

/**
 * Sends a link to the user's email with which they can log back into their account and
 * reset their password.
 */
export async function requestPasswordReset({
  email,
}: RequestPasswordResetArgs): Promise<ServiceResult<void>> {
  const client = await createClient();

  if (await isAuthenticated()) {
    return {
      ok: false,
      error: 'User is already authenticated.',
    };
  }

  const { error } = await client.auth.resetPasswordForEmail(email);

  if (error) {
    return {
      ok: false,
      error: error.message ?? 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }

  return { ok: true, data: undefined };
}

interface GetUserByIdArgs {
  id: string;
}

/**
 * Returns the database user object for the given id. Only users with the
 * `admin` role and the `userProfile:fetchAll` permission can fetch the user.
 *
 * @param id - The id of the user to get.
 *
 * @returns The database user object if the user has permission to fetch the user.
 */
export async function getUserById({
  id,
}: GetUserByIdArgs): Promise<ServiceResult<PrismaUser>> {
  try {
    const hasPermission = await auth.api.userHasPermission({
      body: {
        role: 'admin',
        permissions: {
          userProfile: ['fetchAll'],
        },
      },
    });

    if (!hasPermission.success) {
      throw new Error('User does not have permission to fetch user by id.');
    }

    const res = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }
}

export async function getUsers(): Promise<ServiceResult<PrismaUser[]>> {
  try {
    const hasPermission = await auth.api.userHasPermission({
      body: {
        role: 'admin',
        permissions: {
          userProfile: ['fetchAll'],
        },
      },
    });

    if (!hasPermission.success) {
      throw new Error('User does not have permission to fetch users.');
    }

    const res = await prisma.user.findMany();

    if (!res) {
      throw new Error('An unkown error occurred while fetching users.');
    }

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }
}

interface CreateUserArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'company';
}

export async function createUser({
  email,
  firstName,
  lastName,
  role,
  password,
}: CreateUserArgs): Promise<ServiceResult<UserWithRole>> {
  try {
    const hasPermission = await auth.api.userHasPermission({
      body: {
        role: 'admin',
        permissions: {
          user: ['create'],
        },
      },
    });

    if (!hasPermission.success) {
      throw new Error('No permission to create user');
    }

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
      throw new Error('Failed to create user');
    }

    return {
      ok: true,
      data: res.user,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return {
      ok: false,
      error: 'An error occurred while creating the user',
    };
  }
}
