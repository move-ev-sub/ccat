'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Label } from '@/components/ui/label';
import { Event } from '@/generated/prisma/client';
import { createSlot } from '@/server/services/slot';
import { addMinutes } from 'date-fns';
import React from 'react';
import { toast } from 'sonner';
import { TimePicker } from '../time-picker/time-picker';

const newSlotSchema = z.object({
  eventId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

export function CreateNewSlotForm({
  eventId,
  baseDate,
  onSuccess,
}: {
  eventId: Event['id'];
  baseDate: Date;
  // Callback for when the event is created
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const form = useForm<z.infer<typeof newSlotSchema>>({
    resolver: zodResolver(newSlotSchema),
    defaultValues: {
      eventId: eventId,
      startDate: baseDate,
      endDate: addMinutes(baseDate, 1),
    },
  });

  async function areSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  async function onSubmit(values: z.infer<typeof newSlotSchema>) {
    setLoading(true);
    setError(undefined);

    if (!(await areSameDay(values.startDate, values.endDate))) {
      setError('Start- und Endzeit müssen am selben Tag liegen.');
      setLoading(false);
      return;
    }

    if (values.startDate > values.endDate) {
      setError('Startzeit muss vor der Endzeit liegen.');
      setLoading(false);
      return;
    }

    const res = await createSlot(eventId, values.startDate, values.endDate);

    if (!res.ok) {
      setError(res.error);
      setLoading(false);
      return;
    }

    setLoading(false);

    toast.success('Slot wurde erfolgreich erstellt.');

    // Call the onSuccess function
    onSuccess?.();

    // TODO: Redirect to the newly created event
    // router.push('/admin');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="date" className="block">
            Datum
          </Label>
          <Input
            id="date"
            className="disabled:opacity-100"
            disabled
            value={'13.12.2025'}
          />
        </div>
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Startzeit</FormLabel>
              <FormControl>
                <TimePicker
                  setDate={field.onChange}
                  date={field.value}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endzeit</FormLabel>
              <FormControl>
                <TimePicker
                  setDate={field.onChange}
                  date={field.value}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant={'accent'}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Lädt...' : 'Slot erstellen'}
        </Button>
        <FormError visible={!!error} message={error} />
      </form>
    </Form>
  );
}
