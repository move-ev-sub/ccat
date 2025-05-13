'use client';

import { DatePickerWithRange } from '@/components/forms/settings/date-with-range';
import { Badge } from '@/components/ui/badge';
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
import { Phase, PhaseType } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import { createPhase, updatePhase } from '@/server/services/phase';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/16/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  phase: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    {
      required_error: 'Please select a date range',
    }
  ),
});

export function PhaseSetupForm({
  phase,
  phaseType,
  phaseIndex,
  title,
  description,
  eventId,
}: {
  /**
   * When a fitting event phase was found on the server, the phase object
   * should be passed to the form to prefill the form with the existing
   * phase data. This also means, that the form will be in "edit" mode and
   * the user can only change the start and end date of the phase.
   */
  phase?: Omit<Phase, 'createdById'>;

  /**
   * Additionaly to the phase object, the form should also receive the type
   * of the event phase. This is needed to create a new phase for the event.
   */
  phaseType: PhaseType;

  /**
   * A 0-based index of the event phase. This is used to display the phase number
   * in the event phase card.
   */
  phaseIndex: number;

  /**
   * The title of the event phase (e.g. "Vorbereitungsphase").
   */
  title: string;

  /**
   * A description of the event phase. This should provide additional information
   * about the event phase and what the user can expect during this phase.
   */
  description: string;

  /**
   * The id of the event the phase belongs to.
   */
  eventId: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const currentDate = new Date();
  const defaultStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
    0,
    0,
    0
  );
  const defaultEndDate = addDays(defaultStartDate, 5);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phase: {
        from: phase?.startDate ?? defaultStartDate,
        to: phase?.endDate ?? defaultEndDate,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(undefined);

    const res = phase
      ? await updatePhase({
          from: values.phase.from,
          to: values.phase.to,
          id: phase.id,
        })
      : await createPhase({
          from: values.phase.from,
          to: values.phase.to,
          eventId,
          type: phaseType,
        });

    if (!res.ok) {
      setLoading(false);
      return setError(res.error);
    }

    setLoading(false);

    toast.success(
      phase
        ? `Die ${title} wurde erfolgreich aktualisiert.`
        : `Die ${title} wurde erfolgreich eingerichtet.`
    );
  }

  return (
    <PhaseCard phaseIndex={phaseIndex}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="phase"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-wrap items-center justify-start gap-2 md:gap-4">
                  <FormLabel className="text-foreground text-base font-medium">
                    {title}
                  </FormLabel>
                  {!phase ? (
                    <Badge variant={'warn'}>
                      <ExclamationTriangleIcon />
                      Nicht eingerichtet
                    </Badge>
                  ) : (
                    <Badge variant={'success'}>
                      <CheckIcon />
                      Eingerichtet
                    </Badge>
                  )}
                </div>
                <FormDescription className="text-secondary mt-2 mb-6 max-w-prose text-sm">
                  {description}
                </FormDescription>
                <div className="flex flex-col justify-start gap-4 md:flex-row md:items-center">
                  <FormControl>
                    <DatePickerWithRange {...field} />
                  </FormControl>

                  <Button
                    type="submit"
                    disabled={loading || !form.formState.isDirty}
                    className="md:w-fit"
                  >
                    {loading ? (
                      'Lädt...'
                    ) : (
                      <>
                        Speichern
                        <CheckIcon />
                      </>
                    )}
                  </Button>
                </div>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />

          <FormError visible={!!error} message={error} />
        </form>
      </Form>
    </PhaseCard>
  );
}

/**
 * The event phase card component serves as a wrapper component for the event phases
 * to better display the event phase information and distinguish between the different
 * phases.
 */
function PhaseCard({
  className,
  phaseIndex,
  children,
  ...props
}: React.ComponentProps<'li'> & {
  /**
   * A 0-based index of the event phase. This is used to display the phase number
   * in the event phase card.
   */
  phaseIndex: number;
}) {
  return (
    <li
      data-slot="event-phase-card"
      className={cn(
        'relative flex items-start justify-start gap-8 pb-20 last:pb-0',
        className
      )}
      {...props}
    >
      <div className="bg-border-secondary absolute top-0 left-4 z-0 h-full w-px -translate-x-1/2" />
      <div className="relative z-10 h-full">
        <div className="text-foreground bg-background-muted border-border-secondary flex size-8 items-center justify-center rounded-full border text-lg font-semibold">
          {phaseIndex + 1}
        </div>
      </div>
      <div>{children}</div>
    </li>
  );
}
