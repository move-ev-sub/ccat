import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, {
    message: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
  })
  .regex(/[A-Z]/, {
    message: 'Das Passwort muss mindestens einen Großbuchstaben enthalten.',
  })
  .regex(/[0-9]/, {
    message: 'Das Passwort muss mindestens eine Zahl enthalten.',
  })
  .regex(/[a-z]/, {
    message: 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten.',
  })
  .regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, {
    message: 'Das Passwort muss mindestens ein Sonderzeichen enthalten.',
  });

export const signInWithPasswordSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export const signUpWithEmailSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: passwordSchema,
  acceptLegal: z.boolean().refine((val) => val, {
    message:
      'Du musst die Nutzungsbedingungen akzeptieren, um dich zu registrieren.',
  }),
});

export const registerFormSchema = signUpWithEmailSchema
  .and(
    z.object({
      confirmPassword: z
        .string({
          required_error: 'Passwort bestätigen ist erforderlich',
        })
        .min(1, {
          message: 'Passwort bestätigen ist erforderlich',
        }),
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwörter stimmen nicht überein',
    path: ['confirmPassword'],
  });
