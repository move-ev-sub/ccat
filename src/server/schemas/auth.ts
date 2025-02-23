import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignUpData = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Passwort muss mindestens 6 Zeichen lang sein.' }),
});

export type LoginData = z.infer<typeof loginSchema>;
