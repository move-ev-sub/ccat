'use client';

import { Button } from '@/components/ui/button';
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
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PasswordInput } from '../password-input/password-input';
import { PasswordCriteria } from '../password-input/password-input.types';

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
        {/* <FormField
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
        /> */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Lädt...' : 'Anmelden'}
        </Button>
        <FormError visible={!!error} message={error} />
      </form>
    </Form>
  );
}
