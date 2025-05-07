'use client';

import { RequiredMark } from '@/components/forms/required-mark';
import { SlotSelector } from '@/components/slot-selector/slot-selector';
import { TimePicker24h } from '@/components/time-picker/time-picker-24h';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { createSubEvent } from '@/server/services/sub-event';
import { FullCompanyProfile } from '@/server/types/profile';
import { cn } from '@/utils';
import { CalendarIcon } from '@heroicons/react/16/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Slot } from '@prisma/client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string(),
  company: z.string().uuid(),
  slot: z
    .string()
    .min(1, {
      message: 'Bitte wähle einen Slot aus.',
    })
    .uuid(),
  startDate: z.date(),
  endDate: z.date(),
  maxParticipants: z
    .number({
      required_error: 'Die maximale Anzahl an Teilnehmern ist erforderlich.',
    })
    .min(1),
  description: z.string().optional(),
});

export function CreateNewSubEventForm({
  eventId,
  companies,
  slots,
}: {
  eventId: string;
  companies: FullCompanyProfile[];
  slots: Slot[];
}) {
  /**
   * The loading state of the form. This is used to determine whether the form
   * is currently loading or not. If the form is loading, the submit button will
   * be disabled and display a loading indicator. This also disables the form
   * from being submitted multiple times.
   */
  const [loading, setLoading] = React.useState(false);

  /**
   * The error state of the form. This is used to display an error message if
   * an error occurs during the form submission. If an error occurs, the error
   * message will be displayed to the user and the form will not be submitted.
   *
   * This is not equivalent to error message from form validation. This is used
   * to display an error message if an error occurs during the form submission.
   */
  const [error, setError] = React.useState<string | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      slot: '',
      maxParticipants: 30,
      description: '',
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values);
    setLoading(true);
    setError(undefined);

    const res = await createSubEvent({
      name: values.name,
      startDate: values.startDate,
      endDate: values.endDate,
      maxParticipants: values.maxParticipants,
      description: values.description,
      eventId: eventId,
      hostId: values.company,
      slotId: values.slot,
    });

    if (!res.ok) {
      toast.error('Veranstaltung konnte nicht erstellt werden: ' + res.error);
      setLoading(false);
      return;
    }

    toast.success('Unterveranstaltung erfolgreich erstellt.');

    form.reset();
    router.push(`/admin/event/${eventId}/sub-events`);
    setLoading(false);
  }

  return (
    <>
      {/* The actual form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Veranstaltungsname
                    <RequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Bearing Point" {...field} />
                  </FormControl>
                  <FormDescription>
                    Name der Unterveranstaltung.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Veranstalter
                    <RequiredMark />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wähle einen Veranstalter aus">
                          {/* Find the matching company in the companies array */}
                          {companies.find(
                            (company) => company.id === field.value
                          )?.companyProfile?.name ??
                            'Wähle einen Veranstalter aus'}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.companyProfile?.name ?? company.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Der Veranstalter der Unterveranstaltung.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="slot"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Veranstaltungszeit
                  <RequiredMark />
                </FormLabel>
                <FormControl>
                  <SlotSelector
                    slots={slots}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
                            'w-full max-w-96 justify-start text-left font-normal sm:max-w-72',
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
                <FormItem className="flex flex-col">
                  <FormLabel className="text-left">
                    Endzeit
                    <RequiredMark />
                  </FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full max-w-96 justify-start text-left font-normal sm:max-w-72',
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
          </div>

          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Maximale Teilnehmerzahl</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value ?? 0}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 0) {
                        field.onChange(value);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Die maximale Anzahl an Teilnehmern für diese
                  Unterveranstaltung.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Beschreibung</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Beschreibe die Unterveranstaltung in einigen Worten..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Eine optionale Beschreibung der Unterveranstaltung.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Lädt...' : 'Unternehmen erstellen'}
          </Button>
          <FormError visible={!!error} message={error} />
        </form>
      </Form>
    </>
  );
}
