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
import {
  BackButton,
  ForwardButton,
  StepsNavigation,
} from '@/flows/_lib/steps/steps-navigation';
import { useStepsContext } from '@/flows/_lib/steps/steps.context';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import React, { Fragment } from 'react';
import { Path, useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { useApplicationStore } from '../../stores/application.store';
import { PrioritizeGroup } from '../prioritize-group';

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
// function createPrioritizeSchema<T extends Record<string, string>>(
//   slotEntries: T
// ) {

//   type KeyHelper = keyof T

//   const testShape = Object.entries(slotEntries).reduce((acc, [key, value]) => {
//     acc[key] = z.enum(value, {
//       error: (issue) => {
//         if (issue.code === 'invalid_value') {
//           return 'Bitte wähle eine Veranstaltung aus';
//         }
//         return undefined;
//       },
//     });
//     return acc;
//   }, {} as Record<KeyHelper, z.ZodEnum<Record<string, string>>>);

//   const testArray: KeyHelper[] = Object.keys

//   const shape: Record<, z.ZodTypeAny> = {};

//   Object.entries(slotEntries)
//     // Filter out all slots that have no selections
//     .filter(([_, selections]) => selections.length > 0)
//     .forEach(([id, selections]) => {
//       const selectionIds: string[] = selections.map(
//         (_selection) => _selection.id
//       );

//       const SELECT_ERROR = 'Bitte wähle eine Veranstaltung aus';

//       shape[id] = z.enum(selectionIds, {
//         error: (issue) => {
//           if (issue.code === 'invalid_value') {
//             return SELECT_ERROR;
//           }

//           return undefined;
//         },
//       });
//     });

//   return z.object(shape);
// }

function createPrioritizeSchema<T extends Record<string, string[]>>(
  slotEntries: T
): z.ZodObject<{
  [K in keyof T]: z.ZodEnum<Record<string, string>>;
}> {
  const shape: Record<
    keyof T,
    z.ZodEnum<Record<string, string>>
  > = Object.entries(slotEntries).reduce(
    (acc, [key, value]) => {
      acc[key as keyof T] = z.enum(value, {
        error: (issue) => {
          if (issue.code === 'invalid_value') {
            return 'Bitte wähle eine Veranstaltung aus';
          }
          return undefined;
        },
      });
      return acc;
    },
    {} as Record<keyof T, z.ZodEnum<Record<string, string>>>
  );

  return z.object(shape);
}

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

  const { goForward } = useStepsContext();

  const slotEntries: Record<string, string[]> = React.useMemo(() => {
    return Object.values(slots).reduce(
      (acc, slot) => {
        acc[slot.id] = slot.selections.map((selection) => selection.id);
        return acc;
      },
      {} as Record<string, string[]>
    );
  }, [slots]);

  // Create the zod schema for the form
  const formSchema: z.ZodObject<
    {
      [x: keyof typeof slotEntries]: z.ZodEnum<Record<string, string>>;
    },
    z.core.$ZodObjectConfig
  > = createPrioritizeSchema(slotEntries);

  const form = useForm({
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

    goForward();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {Object.keys(slotEntries).map((id) => (
          <Fragment key={id}>
            <FormField
              control={form.control}
              name={id as Path<z.infer<typeof formSchema>>}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    {format(slots[id].startDate, 'dd.MM.yyyy, HH:mm')} -{' '}
                    {format(slots[id].endDate, 'HH:mm')}
                  </FormLabel>

                  <FormMessage />
                  <FormControl className="col-span-3">
                    <PrioritizeGroup
                      slotEntry={slots[id]}
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator className="my-12" />
          </Fragment>
        ))}
        <StepsNavigation>
          <BackButton />
          <ForwardButton type="submit" onClick={() => {}} />
        </StepsNavigation>
      </form>
    </Form>
  );
}
