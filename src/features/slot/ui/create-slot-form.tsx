'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { TimePicker } from '@/components/time-picker/time-picker';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Event } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import { addMinutes } from 'date-fns';
import React from 'react';
import { toast } from 'sonner';
import { createSlot } from '../services/slotService';
import { createSlotSchema } from '../validations';

export function CreateNewSlotForm({
  eventId,
  className,
  ...props
}: React.ComponentProps<'form'> & {
  eventId: Event['id'];
}) {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof createSlotSchema>>({
    resolver: zodResolver(createSlotSchema),
    defaultValues: {
      eventId: eventId,
      startDate: new Date(),
      endDate: addMinutes(new Date(), 60),
    },
  });

  async function areSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  async function onSubmit(values: z.infer<typeof createSlotSchema>) {
    setLoading(true);

    if (!(await areSameDay(values.startDate, values.endDate))) {
      toast.error('Start- und Endzeit müssen am selben Tag liegen.');
      setLoading(false);
      return;
    }

    if (values.startDate > values.endDate) {
      toast.error('Startzeit muss vor der Endzeit liegen.');
      return;
    }

    const res = await createSlot({
      ...values,
    });

    if (!res.ok) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success(
      'Slot wurde erfolgreich erstellt. Lade die Seite neu um den Slot anzuzeigen.'
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-6', className)}
        {...props}
      >
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

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Lädt...' : 'Slot erstellen'}
        </Button>
      </form>
    </Form>
  );
}
