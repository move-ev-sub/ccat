'use client';

import { RequiredMark } from '@/components/required-mark';
import { TimePicker24h } from '@/components/time-picker/time-picker-24h';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SlotSelector } from '@/features/slot/ui/slot-selector';
import { Slot } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import { CalendarIcon } from '@heroicons/react/16/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { User as AuthUser } from 'better-auth';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createSubEvent } from '../services/subEventService';
import { createSubEventSchema } from '../validations';

export function CreateSubEventForm({
  className,
  companies,
  slots,
  eventId,
  ...props
}: Omit<React.ComponentProps<'form'>, 'onError'> & {
  companies: AuthUser[];
  slots: Slot[];
  eventId: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof createSubEventSchema>>({
    resolver: zodResolver(createSubEventSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof createSubEventSchema>) {
    setLoading(false);

    const res = await createSubEvent({
      endDate: values.endDate,
      eventId: eventId,
      hostId: values.hostId,
      maxParticipants: 30,
      name: values.name,
      slotId: values.slotId,
      startDate: values.startDate,
      description: values.description,
    });

    if (!res.ok) {
      toast.error(res.error);
      return;
    }

    toast.success('Unterveranstaltung erstellt');
    router.push(`/admin/event/${eventId}/sub-events`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid grid-cols-2 gap-8 space-y-6', className)}
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
          name="hostId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Veranstalter
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wähle einen Veranstalter aus" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Der Veranstalter der Unterveranstaltung.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Beschreibung</FormLabel>
              <FormControl>
                <Textarea
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
        <FormField
          control={form.control}
          name="slotId"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Slot</FormLabel>
              <FormControl>
                <SlotSelector
                  value={field.value}
                  onValueChange={field.onChange}
                  slots={slots}
                />
              </FormControl>
              <FormDescription>
                Wähle einen Slot aus, in dem das Event stattfinden soll.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-left">
                Startzeit
                <RequiredMark />
              </FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, 'PPP HH:mm:ss')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="border-border border-t p-3">
                    <TimePicker24h
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-left">
                Startzeit
                <RequiredMark />
              </FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, 'PPP HH:mm:ss')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="border-border border-t p-3">
                    <TimePicker24h
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={'accent'}
          disabled={loading}
          className="col-span-2 w-full"
        >
          {loading ? 'Lädt...' : 'Veranstaltung erstellen'}
        </Button>
      </form>
    </Form>
  );
}
