'use server';

import {
  passwordSchema,
  signInWithPasswordSchema,
} from '@/features/auth/validations';
import { auth } from '@/lib/api/auth';
import { GENERAL_ERROR_CODES } from '@/lib/error/codes';
import { withAuth } from '@/lib/helpers/withAuth';
import { ServiceResult } from '@/types';
import { User } from 'better-auth';
import { randomBytes } from 'crypto';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  SignInWithPasswordArgs,
  SignUpWithEmailArgs,
  UpdateOwnSettingsArgs,
} from '../types';

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
  args: SignInWithPasswordArgs
): Promise<ServiceResult<void>> {
  try {
    const parseRes = await signInWithPasswordSchema.safeParseAsync(args);

    if (!parseRes.success) {
      return {
        ok: false,
        error: parseRes.error.message,
      };
    }

    const { email, password } = parseRes.data;

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      return {
        ok: false,
        error: 'User is already authenticated.',
      };
    }

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
}

/**
 * Signs the current user out.
 */
export async function signOut(): Promise<undefined> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    redirect('/auth/login');
  } catch (error) {
    console.error(error);
  }
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
 * Updates the first name, last name, notify me and email reminders of the
 * current user.
 *
 * The function is wrapped with the `withAuth` helper to ensure that the user
 * is authenticated.
 *
 * @requires {permission} [authenticated]
 *
 * @returns A ServiceResult with the status of the update.
 */
export const updateOwnSettings = withAuth<[UpdateOwnSettingsArgs], void>(
  async ({ args: [{ firstName, lastName, notifyMe, emailReminders }] }) => {
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
      throw new Error(GENERAL_ERROR_CODES.UNKNOWN_ERROR);
    }

    return {
      ok: true,
      data: undefined,
    };
  }
);

interface RequestPasswordResetArgs {
  email: string;
}

/**
 * Sends a link to the user's email with which they can log back into their account and
 * reset their password.
 *
 * @deprecated
 */
export async function requestPasswordReset({}: RequestPasswordResetArgs): Promise<
  ServiceResult<void>
> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return {
      ok: false,
      error: 'User is already authenticated.',
    };
  }

  return { ok: false, error: 'Feature not implemented.' };
}
