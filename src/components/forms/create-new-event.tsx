'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormError,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createEvent } from '@/server/actions/event';
import { newEventSchema } from '@/server/schemas/event';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Textarea } from '../ui/textarea';

export function CreateNewEventForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const router = useRouter();

  const form = useForm<z.infer<typeof newEventSchema>>({
    resolver: zodResolver(newEventSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'draft',
    },
  });

  async function onSubmit(values: z.infer<typeof newEventSchema>) {
    setLoading(true);
    setError(undefined);

    const res = await createEvent(values);

    if (res.status === 'error') {
      setError(res.error);
      setLoading(false);
      return;
    }

    const id = res.data.id;

    console.log('Event created with id:', id);

    setLoading(false);

    // TODO: Redirect to the newly created event
    router.push('/admin');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eventname</FormLabel>
              <FormControl>
                <Input placeholder="Consulting Contact 2025" {...field} />
              </FormControl>
              <FormDescription>
                Dies ist der Name des Events, der öffentlich angezeigt wird.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschreibung</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Die Consulting Contact 2025 wird organisiert von move e.V. und ..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Gib eine optionale Beschreibung des Events an. Diese ist
                öffentlich sichtbar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Lädt...' : 'Veranstaltung erstellen'}
        </Button>
        <FormError visible={!!error} message={error} />
      </form>
    </Form>
  );
}
