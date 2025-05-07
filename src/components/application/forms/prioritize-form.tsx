'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { ApplicationRoutes } from '@/utils/consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PageNavigation } from '../components/page-navigation';
import { PrioritizeGroup } from '../components/prioritize-group';
import { SlotEntry, useApplicationStore } from '../stores/application.store';

// #region Form Schema
// ======================================================================================

/**
 * Generates a dynamic zod schema for the prioritize form based on the slot entries and
 * their selections.
 *
 * The function returns a zod schema with a Record of the form:
 *
 * ```ts
 *   <slotId>: z.ZodEnum<[string, ...string[]]>
 * ```
 * where the key is the slot id and the value is a zod enum schema for the selections in
 * the slot. This is so that when the user submits the prioritize form, we can validate
 * the selections and get the prioritized selection for each slot.
 *
 * @param slotEntries The slot entries to generate the schema for.
 * @returns The zod schema for the prioritize form.
 */
const createPrioritizeSchema = (slotEntries: SlotEntry[]) => {
  // The general shape of the form schema
  const shape: Record<string, z.ZodEnum<[string, ...string[]]>> = {};

  slotEntries
    // Filter out all slots that have no selections
    .filter((entry) => entry.selections.length > 0)
    .forEach((entry) => {
      const selectionIds: string[] = entry.selections.map(
        (selection) => selection.id
      );

      const SELECT_ERROR = 'Bitte wähle eine Veranstaltung aus';

      shape[entry.id] = z.enum(selectionIds as [string, ...string[]], {
        errorMap: (issue) => {
          if (issue.code == 'invalid_enum_value') {
            return { message: SELECT_ERROR };
          }
          return { message: issue.message ?? '' };
        },
      });
    });

  return z.object(shape);
};

// #region Form
// ======================================================================================

/**
 * Renders a form in which the user has to select a prioritized selection for each slot.
 *
 * @returns The Prioritization Form
 */
export function PrioritizeForm() {
  const { slots, setPrioritizedSelection } = useApplicationStore(
    (state) => state
  );

  // Create the zod schema for the form
  const formSchema = createPrioritizeSchema(Object.values(slots));
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.values(slots).reduce(
      (acc, slot) => {
        acc[slot.id] = slot.prioritizedSelection ?? '';
        return acc;
      },
      {} as Record<string, string>
    ),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    Object.entries(values).forEach(([key, value]) => {
      setPrioritizedSelection(key, value);
    });
    router.push(ApplicationRoutes.REVIEW_ROUTE);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {Object.values(slots)
          // Filter out all slots that have no selections
          .filter((slot) => slot.selections.length > 0)
          .map((slot) => (
            <Fragment key={slot.id}>
              <FormField
                control={form.control}
                name={slot.id}
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>
                      {format(slot.startDate, 'dd.MM.yyyy, HH:mm')} -{' '}
                      {format(slot.endDate, 'HH:mm')}
                    </FormLabel>

                    <FormMessage />
                    <FormControl className="col-span-3">
                      <PrioritizeGroup
                        slotEntry={slot}
                        onValueChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Separator className="my-12 last:hidden" />
            </Fragment>
          ))}
        <PageNavigation
          previousRoute={ApplicationRoutes.SELECT_ROUTE}
          canGoBack
          canGoForward={true}
          nextButtonProps={{ type: 'submit' }}
        />
      </form>
    </Form>
  );
}
