import { cuidSchema } from '@/lib/validations/cuid';
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string(),
  password: z.string().min(8),
  role: z.literal('user'),
  autoConfirmEmail: z.boolean().optional(),
});

export const getUserByIdSchema = z.object({
  id: cuidSchema,
});

export const updateOwnSettingsSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string(),
  notifyMe: z.boolean(),
  emailReminders: z.boolean(),
});
