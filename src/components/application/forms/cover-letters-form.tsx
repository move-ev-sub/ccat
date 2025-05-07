'use client';

import { RequiredMark } from '@/components/forms/required-mark';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ApplicationRoutes } from '@/utils/consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PageNavigation } from '../components/page-navigation';
import { Selection, useApplicationStore } from '../stores/application.store';
// #region Form Schema
// ======================================================================================

/**
 * Dynamically creates a zod schema for the cover letters for each selection.
 * This is done because the cover letter is optional for some sub events and
 * required for others. We also only want to show the cover letter field for sub events
 * which the user has actually selected.
 *
 * The functions returns a zod schema with a Record of the form:
 *```ts
 *   <slotId>_<subEventId>: z.ZodString | z.ZodOptional<z.ZodString>
 *```
 *
 * The keys are the slot id and the sub event id of the selection. The value is
 * a zod schema which is either a required or optional zod string, depending on
 * the cover letter requirement of the sub event. We combine the slot id and the
 * sub event id to create a unique key for each selection. This also makes it easy
 * to extract the slot id and the sub event id from the key.
 *
 * @param selections All selections from the store which the user can add a cover letter to.
 * @returns The zod schema for the cover letters.
 */
const createCoverLetterSchema = (selections: Selection[]) => {
  // The General shape of the form schema
  const shape: Record<string, z.ZodString | z.ZodOptional<z.ZodString>> = {};

  selections.forEach((selection) => {
    const required = selection.coverLetterRequirement == 'REQUIRED';
    const maxLength = 1000;

    // form schema for optional cover letters
    const optionalSchema = z
      .string()
      .max(maxLength, {
        message: `Dein Anschreiben darf nicht länger als ${maxLength} Zeichen sein`,
      })
      .optional();

    // form schema for required cover letters
    const requiredSchema = z
      .string({
        required_error:
          'Für diese Veranstaltung ist ein Anschreiben erforderlich',
      })
      .min(1, {
        message: 'Für diese Veranstaltung ist ein Anschreiben erforderlich',
      })
      .max(maxLength, {
        message: `Dein Anschreiben darf nicht länger als ${maxLength} Zeichen sein`,
      });

    // set the form schema for the current selection
    shape[`${selection.slotId}_${selection.id}`] = required
      ? requiredSchema
      : optionalSchema;
  });

  return z.object(shape);
};

// #region Form
// ======================================================================================

/**
 * The Cover Letters Form is used to add cover letters to each selection. A dynamic
 * form schema is generated based on the selections and the cover letter requirements
 * of the sub events. When the user submits the form, the cover letters are added to
 * the store.
 *
 * @param selections All selections from the store which the user can add a cover letter to.
 * @returns The Cover Letters Form.
 */
export function CoverLettersForm({ selections }: { selections: Selection[] }) {
  const { slots, addCoverLetter } = useApplicationStore((state) => state);
  const formSchema = createCoverLetterSchema(selections);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: selections.reduce(
      (acc, selection) => {
        acc[`${selection.slotId}_${selection.id}`] =
          slots[selection.slotId].selections.find(
            (currentSelection) => currentSelection.id === selection.id
          )?.coverLetter ?? '';
        return acc;
      },
      {} as Record<string, string>
    ),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    Object.entries(values).forEach(([key, value]) => {
      const [slotId, selectionId] = key.split('_');
      addCoverLetter(slotId, selectionId, value ?? '');
    });

    // After the form is submitted and the cover letters are added to the store,
    // the user is redirected to the prioritize page.
    router.push(ApplicationRoutes.PRIORITIZE_ROUTE);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {selections.map((selection, index) => (
          <Fragment key={selection.id}>
            {
              // Only render a separator inbetween the form fields and not before the first one
              index > 0 && <Separator className="my-12" />
            }
            <FormField
              control={form.control}
              name={`${selection.slotId}_${selection.id}`}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 gap-8">
                  <div className="space-y-2">
                    <FormLabel>
                      {selection.subEventName}{' '}
                      {selection.coverLetterRequirement === 'REQUIRED' && (
                        <RequiredMark />
                      )}
                    </FormLabel>
                    {selection.coverLetterRequirement !== 'REQUIRED' && (
                      <FormDescription>(Optional)</FormDescription>
                    )}
                    <FormMessage />
                  </div>
                  <FormControl className="col-span-3">
                    <Textarea
                      placeholder={`Füge hier dein Anschreiben für die Veranstaltung "${selection.subEventName}" ein`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
