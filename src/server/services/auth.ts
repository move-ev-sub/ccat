import { createClient } from '@/utils/supabase/server';
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
    return { status: 'Error', error: 'Email and password are required.' };
  }

  const client = await createClient();

  if (!client) {
    console.log('Failed to create Supabase client.');
    return { status: 'Error', error: 'Failed to create Supabase client.' };
  }
  const { error, data } = await client.auth.signInWithPassword({
    email,
    password,
  });

  console.log('signInWithPassword:', { error, data });

  if (error) return { status: 'Error', error: error.message };

  return { status: 'Success', data };
}
