import { createClient } from '@/utils/supabase/server';
import { ServiceResult } from '../types/serviceResult';

export async function signInWithPassword(
  email: string,
  password: string
): Promise<ServiceResult<object>> {
  if (!email || !password)
    return { status: 'Error', error: 'Email and password are required.' };

  const client = await createClient();

  if (!client)
    return { status: 'Error', error: 'Failed to create Supabase client.' };

  const { error, data } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { status: 'Error', error: error.message };

  return { status: 'Success', data };
}
