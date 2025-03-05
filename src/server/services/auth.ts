import { createClient } from '@/utils/supabase/server';
import { Role } from '@prisma/client';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';
import { prisma } from '../db';
import { ServiceResult } from '../types/serviceResult';

/**
 * Signs up a new user with email and password.
 *
 * @param email - The email of the user.
 * @param password - The password of the user.
 *
 * @returns A promise with the status of the sign up.
 */
export async function signUpWithEmail(
  email: string,
  password: string
): Promise<ServiceResult<{ user: User | null; session: Session | null }>> {
  if (!email || !password) {
    return { ok: false, error: 'Email and password are required for singup.' };
  }

  const client = await createClient();

  const { error, data } = await client.auth.signUp({
    email,
    password,
  });

  if (error || !data?.user) {
    console.error(
      'Error when signing up:',
      error?.message || 'Ein unbekannter Fehler ist aufgetreten.'
    );
    return {
      ok: false,
      error: error?.message || 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }

  // Create a profile for the user
  const res = await prisma.profile.create({
    data: {
      id: data.user.id,
      role: 'USER',
      userProfile: {
        create: {
          firstName: '',
          lastName: '',
          emailReminders: false,
          notifyMe: false,
        },
      },
    },
  });

  if (!res) {
    return {
      ok: false,
      error:
        'Ein unbekannter Fehler ist aufgetreten. Es konnte kein Profil für den Benutzer erstellt werden.',
    };
  }

  return { ok: true, data };
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
): Promise<
  ServiceResult<{
    user: User | null;
    session: Session | null;
  }>
> {
  if (!email || !password) {
    console.log('Error when logging in: Email and password are required.');
    return {
      ok: false,
      error: 'Email and password are required.',
    };
  }

  const client = await createClient();

  // TODO: Check if the supabase client exists -> Optional

  if (await isAuthenticated(client)) {
    return {
      ok: false,
      error: 'User is already authenticated.',
    };
  }

  // Sign in with email and password
  const { error, data } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      ok: false,
      error: error.message,
    };
  }

  return { ok: true, data };
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
  if (!(await isAuthenticated(client))) {
    return;
  }

  client.auth.signOut();
}

/**
 * Returns the current user object.
 *
 * @param client - Supabase client (optional)
 * @returns The current user object.
 */
export async function getUser(client?: SupabaseClient): Promise<User | null> {
  if (!client) {
    client = await createClient();
  }

  const {
    data: { user },
  } = await client.auth.getUser();

  return user;
}

/**
 * Checks if the current user is authenticated by checking if the
 * supabase auth client returns a valid user object.
 *
 * @param client - Supabase client (optional)
 *
 * @returns boolean - `false` if the user is not authenticated, `true` if the user is authenticated.
 */
export async function isAuthenticated(
  client?: SupabaseClient
): Promise<boolean> {
  if (!client) {
    client = await createClient();
  }

  const user = await getUser(client);

  return user !== null && user.id !== null;
}

/**
 * Checks if the current user is an admin.
 *
 * @returns boolean - `false` if the user is not an admin, `true` if the user is an admin.
 */
export async function isAdmin(
  client?: SupabaseClient
): Promise<ServiceResult<boolean>> {
  if (!client) {
    client = await createClient();
  }

  // Check if user is authenticated
  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  const user = await getUser(client);

  if (!user) {
    return {
      ok: false,
      error: 'No user object found.',
    };
  }

  const { id: userId } = user;

  const profile = await prisma.profile.findFirst({
    where: {
      id: userId,
    },
  });

  // Check if user is an admin
  if (!profile || profile.role !== 'ADMIN') {
    return {
      ok: false,
      error: 'User is not authorized.',
    };
  }

  return { ok: true, data: true };
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
 */
export async function getCurrentRole(): Promise<ServiceResult<Role>> {
  const client = await createClient();

  if (!(await isAuthenticated(client))) {
    return {
      ok: false,
      error: 'User is not authenticated.',
    };
  }

  const user = await getUser(client);

  if (!user) {
    return {
      ok: false,
      error: 'No user object found.',
    };
  }

  const profile = await prisma.profile.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!profile) {
    return {
      ok: false,
      error: `No profile found for user with id ${user.id}`,
    };
  }

  return {
    ok: true,
    data: profile.role,
  };
}
