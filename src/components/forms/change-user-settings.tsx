'use client';

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
import { userSettingsSchema } from '@/server/schemas/auth';

import { changeUserSettings } from '@/server/actions/auth';
import { FullUnknownProfile } from '@/server/services/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';

export function UserSettingsForm({ profile }: { profile: FullUnknownProfile }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const idPrisma = profile?.userProfile?.id;
  const firstName = profile?.userProfile?.firstName;
  const lastName = profile?.userProfile?.lastName;

  const form = useForm<z.infer<typeof userSettingsSchema>>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
    },
  });

  // wie hier noch die Prisma ID mitgeben?
  async function onSubmit(values: z.infer<typeof userSettingsSchema>) {
    setLoading(true);
    setError(undefined);
    if (!idPrisma) {
      setError('User ID is missing.');
      setLoading(false);
      return;
    }
    const res = await changeUserSettings(idPrisma, values);
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
                  <Input placeholder="Dein Vorname" {...field} />
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
                  <Input type="text" placeholder="Dein Nachname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Lädt...' : 'Änderungen speichern'}
        </Button>
        <FormError visible={!!error} message={error} />
      </form>
    </Form>
  );
}
