import { PasswordCriteria } from '@/components/password-input/password-input.types';
import { z } from 'zod';

export const signUpPasswordCriteria: PasswordCriteria[] = [
  {
    id: 'length',
    label: 'Mindestens 8 Zeichen',
    regex: /.{8,}/,
    zodCheck: (schema: z.ZodString) => schema.min(8),
  },
  {
    id: 'lowercase',
    label: 'Mindestens ein Kleinbuchstabe',
    regex: /[a-z]/,
    zodCheck: (schema: z.ZodString) => schema.regex(/[a-z]/),
  },
  {
    id: 'uppercase',
    label: 'Mindestens ein Großbuchstabe',
    regex: /[A-Z]/,
    zodCheck: (schema: z.ZodString) => schema.regex(/[A-Z]/),
  },
  {
    id: 'number',
    label: 'Mindestens eine Zahl',
    regex: /[0-9]/,
    zodCheck: (schema: z.ZodString) => schema.regex(/[0-9]/),
  },
  {
    id: 'special',
    label: 'Mindestens ein Sonderzeichen',
    regex: /[^a-zA-Z0-9]/,
    zodCheck: (schema: z.ZodString) => schema.regex(/[^a-zA-Z0-9]/),
  },
  {
    id: 'noSpaces',
    label: 'Keine Leerzeichen',
    regex: /^\S*$/,
    zodCheck: (schema: z.ZodString) => schema.regex(/^\S*$/),
  },
];

const generatePasswordSchema = (): z.ZodObject<{ password: z.ZodString }> => {
  let schema = z.string();
  signUpPasswordCriteria.forEach((criterion) => {
    schema = criterion.zodCheck(schema);
  });
  return z.object({ password: schema });
};

export const signUpSchema = z
  .object({
    email: z.string().email('Ungültige E-Mail-Adresse'),
  })
  .and(generatePasswordSchema());

export type SignUpData = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z
    .string()
    .min(6, { message: 'Passwort muss mindestens 6 Zeichen lang sein.' }),
});

export type LoginData = z.infer<typeof loginSchema>;
