'use server';

import {
  LoginData,
  loginSchema,
  SignUpData,
  signUpSchema,
  UserSettingsData,
  userSettingsSchema,
} from '@/server/schemas/auth';
import { signInWithPassword, signUpWithEmail } from '@/server/services/auth';
import { redirect } from 'next/navigation';
import * as authService from '../services/auth';
import { AuthActionResponse } from '../types/action-response';

export async function signup(
  signUpData: SignUpData
): Promise<AuthActionResponse<null>> {
  const parseRes = await signUpSchema.safeParseAsync(signUpData);

  if (!parseRes.success) {
    return {
      status: 'error',
      error: parseRes.error.message || 'Eingabe ist invalide.',
    };
  }

  const res = await signUpWithEmail(signUpData);

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

export async function changeUserSettings(
  idPrisma: string,
  userSettingsData: UserSettingsData
  // I think Promise isn't needed here, since only sideeffects are executed
): Promise<AuthActionResponse<null>> {
  const parseRes = await userSettingsSchema.safeParseAsync(userSettingsData);

  if (!parseRes.success) {
    return {
      status: 'error',
      error: parseRes.error.message || 'Eingabe ist invalide.',
    };
  }

  const res = await authService.updateUserSettings(idPrisma, userSettingsData);

  if (!res.ok) {
    return {
      status: 'error',
      error: res.error || 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }
  redirect('/user/settings');
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
