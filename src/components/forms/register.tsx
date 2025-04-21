'use client';

import {
  PasswordInput,
  type PasswordCriteria,
} from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormError,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signup } from '@/server/actions/auth';
import { signUpSchema } from '@/server/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const passwordCriteria: PasswordCriteria[] = [
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

export function RegisterForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setLoading(true);
    setError(undefined);

    const res = await signup(values);

    if (res.status === 'error') {
      setError(res.error);
    }

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
                <PasswordInput
                  toggalble
                  criteria={passwordCriteria}
                  {...field}
                />
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
                      className="text-foreground hover:text-accent font-medium transition-colors"
                    >
                      Nutzungsbedingungen
                    </Link>{' '}
                    und{' '}
                    <Link
                      href="/legal/privacy-policy"
                      className="text-foreground hover:text-accent font-medium transition-colors"
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
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Lädt...' : 'Registrieren'}
        </Button>
        <FormError visible={!!error} message={error} />
      </form>
    </Form>
  );
}
