'use server';

import {
  LoginData,
  loginSchema,
  SignUpData,
  signUpSchema,
} from '@/server/schemas/auth';
import { signInWithPassword, signUpWithEmail } from '@/server/services/auth';
import { redirect } from 'next/navigation';

export async function signup({ email, password }: SignUpData) {
  const parseRes = await signUpSchema.safeParseAsync({ email, password });

  if (!parseRes.success) {
    return { status: 'Error', error: parseRes.error };
  }

  const res = await signUpWithEmail(email, password);

  if (res.error || !res.data) {
    return { status: 'Error', error: res.error };
  }

  redirect('/');
}

export async function login({ email, password }: LoginData) {
  console.log('login for email:', email);
  const parseRes = await loginSchema.safeParseAsync({ email, password });

  if (!parseRes.success) {
    console.error('Failed to validate login form:', parseRes.error);
    return { status: 'Error', error: parseRes.error };
  }

  const res = await signInWithPassword(email, password);

  if (res.error || !res.data) {
    return { status: 'Error', error: res.error };
  }

  redirect('/');
}
