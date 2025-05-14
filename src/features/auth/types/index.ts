import {
  signInWithPasswordSchema,
  signUpWithEmailSchema,
} from '@/features/auth/validations';
import { z } from 'zod';

export interface UpdateOwnSettingsArgs {
  /**
   * The first name of the user.
   */
  firstName: string;
  /**
   * The last name of the user.
   */
  lastName: string;
  /**
   * Whether the user wants to receive email reminders.
   */
  notifyMe: boolean;
  /**
   * Whether the user wants to receive email reminders.
   */
  emailReminders: boolean;
}

export type SignInWithPasswordArgs = z.infer<typeof signInWithPasswordSchema>;

export type SignUpWithEmailArgs = z.infer<typeof signUpWithEmailSchema>;
