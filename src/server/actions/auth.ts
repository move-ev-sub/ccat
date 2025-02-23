'use server';

import { loginSchema, LoginSchema } from '@/server/schemas/auth';
import { signInWithPassword } from '@/server/services/auth';
import { redirect } from 'next/navigation';

export async function login({ email, password }: LoginSchema) {
  const parseRes = await loginSchema.safeParseAsync({ email, password });

  if (!parseRes.success) {
    return { status: 'Error', error: parseRes.error };
  }

  const res = await signInWithPassword(email, password);

  if (res.error || !res.data) {
    return { status: 'Error', error: res.error };
  }

  redirect('/');
}
