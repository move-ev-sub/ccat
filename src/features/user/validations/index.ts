import { cuidSchema } from '@/lib/validations/cuid';
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(8),
  role: z.enum(['user', 'company']),
  autoConfirmEmail: z.boolean().optional(),
});

export const getUserByIdSchema = z.object({
  id: cuidSchema,
});
