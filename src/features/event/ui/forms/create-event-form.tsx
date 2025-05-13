'use client';

import { RequiredMark } from '@/components/required-mark';
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
import { cn } from '@/lib/utils/cn';
import { createEvent } from '@/server/services/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export function CreateEventForm({
  className,
  ...props
}: Omit<React.ComponentProps<'form'>, 'onError'>) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(undefined);

    const res = await createEvent({
      name: values.name,
      description: values.description,
      status: 'DRAFT',
    });

    if (!res.ok) {
      toast.error(res.error);
      return;
    }

    setLoading(false);
    toast.success('Veranstaltung wurde erfolgreich erstellt.');
    router.push(`/admin/event/${res.data.id}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-6', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Eventname
                <RequiredMark />
              </FormLabel>
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
                <Input
                  placeholder="Die Consulting Contact 2025 wird organisiert von move e.V. und ..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Gib eine optionale Beschreibung des Events an. Diese kannst du
                später bearbeiten.
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
