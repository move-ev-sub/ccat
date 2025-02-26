'use server';

import {
  LoginData,
  loginSchema,
  SignUpData,
  signUpSchema,
} from '@/server/schemas/auth';
import { signInWithPassword, signUpWithEmail } from '@/server/services/auth';
import { redirect } from 'next/navigation';
import * as authService from '../services/auth';
import { AuthActionResponse } from '../types/action-response';

export async function signup({
  email,
  password,
  confirmPassword,
}: SignUpData): Promise<AuthActionResponse<null>> {
  const parseRes = await signUpSchema.safeParseAsync({
    email,
    password,
    confirmPassword,
  });

  if (!parseRes.success) {
    return {
      status: 'error',
      error: parseRes.error.message || 'Eingabe ist invalide.',
    };
  }

  if (!password || password !== confirmPassword) {
    return { status: 'error', error: 'Passwörter stimmen nicht überein.' };
  }

  const res = await signUpWithEmail(email, password);

  if (!res.ok) {
    return {
      status: 'error',
      error: res.error || 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }

  // If the user was successfully created, redirect to the home page where
  // they will be redirected to their user specific page
  redirect('/');
}

export async function login({
  email,
  password,
}: LoginData): Promise<AuthActionResponse<null>> {
  const parseRes = await loginSchema.safeParseAsync({ email, password });

  if (!parseRes.success) {
    return {
      status: 'error',
      error: parseRes.error.message || 'Eingabe ist invalide.',
    };
  }

  const res = await signInWithPassword(email, password);

  if (!res.ok) {
    return {
      status: 'error',
      error: res.error || 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }

  redirect('/');
}

export async function isAdmin(): Promise<AuthActionResponse<boolean>> {
  const res = await authService.isAdmin();

  if (!res.ok) {
    return {
      status: 'error',
      error: res.error || 'Ein unbekannter Fehler ist aufgetreten.',
      data: false,
    };
  }

  return { status: 'success', data: res.data };
}

export async function isAuthenticated(): Promise<AuthActionResponse<boolean>> {
  const res = await authService.isAuthenticated();

  return { status: 'success', data: res };
}
