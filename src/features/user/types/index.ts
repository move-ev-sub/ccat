import { z } from 'zod';
import { createUserSchema, getUserByIdSchema } from '../validations';

export type CreateUserArgs = z.infer<typeof createUserSchema>;

export type GetUserByIdArgs = z.infer<typeof getUserByIdSchema>;
