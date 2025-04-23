'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils';
import { PencilIcon, PlusIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubEvent } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import {
  SubApplicationSelection,
  useApplicationStore,
} from './application.store';

interface SubEventSelectCardProps extends React.ComponentProps<typeof Card> {
  subEvent: SubEvent;
}

/**
 * Renders a card that displays a sub-event and allows the user to select
 * it for the application.
 *
 * If the sub event is already added to the application, the card will display
 * a badge indicating that the sub event is already added. The button now displays
 * a remove button.
 *
 * When the event requires a Cover Letter, a textarea field is added. If not,
 * an empty indicator is displayed.
 */
export function SubEventSelectCard({
  subEvent,
  className,
  ...props
}: SubEventSelectCardProps) {
  /**
   * The initial sub application object. This object is used to add a new
   * sub application to the application. The initial object is incomplete, the
   * cover letter needs to be added when adding the sub application.
   */
  const initialSubApplication: Omit<SubApplicationSelection, 'coverLetter'> = {
    eventName: subEvent.name,
    priorization: 'UNSET',
    status: 'PENDING',
    subEventId: subEvent.id,
    prioritized: false,
    slotId: subEvent.slotId,
  };

  const id = React.useId();

  /**
   * Current state of the sub event card.
   *
   * - STALE: The sub event is not added to the application.
   * - EDITING: The Application for the sub event is being edited.
   * - ADDED: The sub event is added to the application.
   */
  // const [state, setState] = React.useState<'STALE' | 'EDITING' | 'ADDED'>(
  //   'STALE'
  // );
  const {
    subApplications,
    addSubApplication,
    removeSubApplication,
    getSubApplication,
    updateSubApplication,
  } = useApplicationStore((store) => store);

  /**
   * The `subApplication` variable is the sub application object for the current
   * sub event. If the sub event is not added to the application, the variable
   * is `undefined`.
   *
   * We use a `useMemo` hook to memoize the sub application object. This is
   * because the sub application object is not a state variable and should not
   * be re-rendered when the component is re-rendered.
   */
  const subApplication = React.useMemo(() => {
    return getSubApplication(subEvent.slotId, subEvent.id);
  }, [subEvent, subApplications, getSubApplication]);

  // Helper variables to keep track of the sub application state
  const [isEditing, setIsEditing] = React.useState(false);
  const isAdded = subApplication !== undefined;

  // Whether the sub event requires a cover letter
  const isCoverLetterRequired = subEvent.coverLetterRequirement === 'REQUIRED';

  /**
   * The onAdd function is called when the user selects a new sub event to add
   * to the application. If the sub event does not require a cover letter, the
   * sub application is added to the application. If the sub event requires a
   * cover letter, the user is has to fill out the cover letter form first.
   *
   * Event though this should be prevented by the UI, the function also checks
   * if the sub event is already added to the application. If so, the function
   * does nothing.
   *
   * @return {void}
   */
  function onAdd() {
    // If the sub event is already added, do nothing
    if (isAdded) {
      return;
    }

    // If the sub event requires a cover letter, set the state to editing
    // This will show the cover letter form
    if (isCoverLetterRequired) {
      setIsEditing(true);
      return;
    }

    // Otherwise, add the sub application to the application
    addSubApplication({
      ...initialSubApplication,
      coverLetter: '', // Empty cover letter
    });
  }

  /**
   * The onSave function is called when the user saves the cover letter for a
   * sub event.
   *
   * If a the sub application is not added, a new sub application is created.
   * Otherwise, the existing sub application is updated.
   *
   * @param {z.infer<typeof formSchema>} values - The values of the form.
   * @return {void}
   */
  function onSave(values: z.infer<typeof formSchema>) {
    const res = formSchema.safeParse(values);

    if (!res.success) {
      // TODO: Show error message
      console.error('Fehler beim Speichern des Cover Letters');
      return;
    }

    if (!isAdded) {
      console.log('Adding sub application');
      addSubApplication({
        ...initialSubApplication,
        coverLetter: res.data.coverLetter,
      });
      setIsEditing(false);
      console.log('Sub application added');
      return;
    }

    // Otherwise, update the existing sub application
    updateSubApplication(subEvent.slotId, {
      subEventId: subEvent.id,
      coverLetter: res.data.coverLetter,
    });
    setIsEditing(false);

    // TODO: Add toast notification
  }

  /**
   * The onEdit function is called when the user wants to edit the cover letter
   * for a sub event. This opens the cover letter form.
   *
   * @return {void}
   */
  function onEdit() {
    setIsEditing(true);
  }

  /**
   * The onRemove function is called when the user removes the sub application
   * from the application.
   *
   * @return {void}
   */
  function onRemove() {
    // If the sub application is not added, skip unnecessary actions
    if (!isAdded) {
      return;
    }

    // Remove the sub application from the application
    removeSubApplication(subEvent.slotId, subEvent.id);
  }

  /**
   * The onDiscard function is called when the user discards the form. This
   * will discard the changes and close the form.
   *
   * @returns {void}
   */
  function onDiscard() {
    // If not editing at all, do nothing
    if (!isEditing) {
      return;
    }

    setIsEditing(false);
  }

  return (
    <Card id={id} role="button" className={cn('h-fit', className)} {...props}>
      <CardContent>
        <CardTitle className="flex items-center justify-start gap-4">
          {subEvent.name}
          {isAdded && <Badge variant={'success'}>Hinzugefügt</Badge>}
        </CardTitle>

        {subEvent.description && (
          <p className="text-secondary mt-2 line-clamp-2 max-w-prose text-sm">
            {subEvent.description}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-secondary space-y-1 text-sm">
            <p>Datum</p>
            <p className="text-foreground font-medium">
              {format(subEvent.startDate, 'dd.MM.yyyy')}
            </p>
          </div>
          <div className="text-secondary space-y-1 text-sm">
            <p>Uhrzeit</p>
            <p className="text-foreground font-medium">
              {format(subEvent.startDate, 'HH:mm')} -{' '}
              {format(subEvent.endDate, 'HH:mm')}
            </p>
          </div>
        </div>

        {isEditing && (
          <CoverLetterForm
            values={{
              coverLetter: subApplication?.coverLetter ?? '',
            }}
            onFormSubmit={onSave}
            onFormDiscard={onDiscard}
            className="mt-8"
          />
        )}

        <div className="flex items-center justify-end gap-4">
          {
            // When not added
            !isAdded && !isEditing && (
              <Button
                className={cn(
                  '[&_svg:not([class*="text-"])]:text-success [&_svg:not([class*="size-"])]:size-4'
                )}
                variant={'outline'}
                onClick={onAdd}
              >
                Veranstaltung hinzufügen
                <PlusIcon />
              </Button>
            )
          }
          {
            // When added and not editing
            isAdded && !isEditing && (
              <Button type="button" variant={'outline'} onClick={onRemove}>
                Entfernen <XMarkIcon className="text-destructive" />
              </Button>
            )
          }
          {
            // When added and cover letter is required, and not editing
            isAdded && isCoverLetterRequired && !isEditing && (
              <Button type="submit" variant={'outline'} onClick={onEdit}>
                Bearbeiten <PencilIcon />
              </Button>
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}

const formSchema = z.object({
  coverLetter: z.string().min(1, {
    message: 'Cover Letter ist erforderlich',
  }),
});

function CoverLetterForm({
  values,
  onFormSubmit,
  onFormDiscard,
  className,
}: React.ComponentProps<'form'> & {
  values: z.infer<typeof formSchema>;
  onFormSubmit: (values: z.infer<typeof formSchema>) => void;
  onFormDiscard: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onFormSubmit(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-8', className)}
      >
        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Füge einen Cover Letter hinzu (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant={'outline'} onClick={onFormDiscard}>
            Abbrechen <XMarkIcon className="text-destructive" />
          </Button>
          <Button type="submit" variant={'accent'}>
            Speichern
          </Button>
        </div>
      </form>
    </Form>
  );
}
