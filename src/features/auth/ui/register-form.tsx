'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { passwordSchema } from '@/server/schemas/auth';
import { signUpWithEmail } from '@/server/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const registerFormSchema = z
  .object({
    firstName: z
      .string({
        required_error: 'Vorname ist erforderlich',
      })
      .min(1, {
        message: 'Vorname ist erforderlich',
      }),
    lastName: z
      .string({
        required_error: 'Nachname ist erforderlich',
      })
      .min(1, {
        message: 'Nachname ist erforderlich',
      }),
    email: z
      .string({
        required_error: 'Email ist erforderlich',
      })
      .email({
        message: 'Ungültige E-Mail-Adresse',
      }),
    password: passwordSchema,
    confirmPassword: z
      .string({
        required_error: 'Passwort bestätigen ist erforderlich',
      })
      .min(1, {
        message: 'Passwort bestätigen ist erforderlich',
      }),
    acceptLegal: z.boolean({
      required_error: 'Bitte akzeptiere die Nutzungsbedingungen',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwörter stimmen nicht überein',
    path: ['confirmPassword'],
  });

export function RegisterForm() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptLegal: false,
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setLoading(true);

    const res = await signUpWithEmail({
      ...values,
    });

    if (!res.ok) {
      toast.error(res.error);

      setLoading(false);
      return;
    }

    router.push('/auth/register/confirm-email');

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vorname</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Max" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nachname</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Mustermann" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="max@mustermann.de"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passwort</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passwort bestätigen</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acceptLegal"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-start justify-start gap-2.5">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5"
                  />
                  <p className="text-secondary grow text-sm">
                    Ich bestätige, dass ich die{' '}
                    <Link
                      href="/legal/terms-of-use"
                      className="text-accent focus-indicator rounded-md"
                    >
                      Nutzungsbedingungen
                    </Link>{' '}
                    und{' '}
                    <Link
                      href="/legal/privacy-policy"
                      className="text-accent focus-indicator rounded-md"
                    >
                      Datenschutzbestimmungen
                    </Link>{' '}
                    gelesen habe und akzeptiere.
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          variant={'accent'}
        >
          {loading ? 'Lädt...' : 'Registrieren'}
        </Button>
      </form>
    </Form>
  );
}
