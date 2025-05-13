import { z } from 'zod';
import {
  createUserSchema,
  getUserByIdSchema,
  updateOwnSettingsSchema,
} from '../validations';

export type CreateUserArgs = z.infer<typeof createUserSchema>;

export type GetUserByIdArgs = z.infer<typeof getUserByIdSchema>;

export type UpdateOwnSettingsArgs = z.infer<typeof updateOwnSettingsSchema>;
