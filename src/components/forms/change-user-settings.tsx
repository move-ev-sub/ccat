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
import { useEffect } from 'react';

import {
  fetchCurrentProfile,
  FullUnknownProfile,
} from '@/server/services/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';

export function UserSettingsForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const [data, setData] = React.useState<FullUnknownProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchCurrentProfile();

      if (res.ok) {
        setData(res.data);
      } else {
        setError(res.error);
      }
    };

    fetchData();
  }, []);

  const firstName = data?.userProfile?.firstName;
  const lastName = data?.userProfile?.lastName;

  const form = useForm<z.infer<typeof userSettingsSchema>>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      firstName: firstName || '',
      lastName: lastName || '',
    },
  });

  async function onSubmit(values: z.infer<typeof userSettingsSchema>) {
    setLoading(true);
    setError(undefined);
    console.log(values);
    // const res = await signup(values);
    // if (res.status === 'error') {
    //   setError(res.error);
    // }
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
                  <Input type="text" placeholder={firstName} {...field} />
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
                  <Input type="text" placeholder={lastName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Lädt...' : 'Änderungen Absenden'}
        </Button>
        <FormError visible={!!error} message={error} />
      </form>
    </Form>
  );
}
