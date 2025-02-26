import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { profilesTable } from '../db/schema';
import { ServiceResult } from '../types/serviceResult';

export async function signUpWithEmail(
  email: string,
  password: string
): Promise<{
  status: 'Success' | 'Error';
  error?: string;
  data?: object;
}> {
  if (!email || !password) {
    console.error('Email and password are required.');

    return { status: 'Error', error: 'Email and password are required.' };
  }

  const client = await createClient();

  if (!client) {
    console.error('Failed to create Supabase client.');
    return { status: 'Error', error: 'Failed to create Supabase client.' };
  }

  const { error, data } = await client.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('An error ocurred, when trying to sign up:', error);
    return { status: 'Error', error: error.message };
  }

  return { status: 'Success', data };
}

export async function signInWithPassword(
  email: string,
  password: string
): Promise<ServiceResult<object>> {
  if (!email || !password) {
    console.log('Email and password are required.');
    return { status: 'error', error: 'Email and password are required.' };
  }

  const client = await createClient();

  if (!client) {
    console.log('Failed to create Supabase client.');
    return { status: 'error', error: 'Failed to create Supabase client.' };
  }
  const { error, data } = await client.auth.signInWithPassword({
    email,
    password,
  });

  console.log('signInWithPassword:', { error, data });

  if (error) return { status: 'error', error: error.message };

  return { status: 'success', data };
}

/**
 * Checks if the current user is an admin.
 *
 * @returns boolean - `false` if the user is not an admin, `true` if the user is an admin.
 */
export async function isAdmin(): Promise<ServiceResult<boolean>> {
  const client = await createClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  // Check if user is authenticated
  if (!user || user.id === null) {
    return {
      status: 'error',
      error: 'User is not authenticated.',
      data: false,
    };
  }

  // Check if user is an admin
  const profile = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.id, user.id),
  });

  if (!profile || profile.profileType !== 'admin') {
    return {
      status: 'error',
      error: 'User is not authorized.',
      data: false,
    };
  }

  return { status: 'success', data: true };
}
