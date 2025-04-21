'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/utils';
import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid';
import { SubEvent } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react';

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
  const id = React.useId();
  const [added, setAdded] = React.useState(false);
  const { name, description, coverLetterRequirement, startDate, endDate } =
    subEvent;

  return (
    <Card id={id} role="button" className={cn('h-fit', className)} {...props}>
      <CardContent>
        <CardTitle className="flex items-center justify-start gap-4">
          {name}
          {added && <Badge variant={'success'}>Hinzugefügt</Badge>}
        </CardTitle>

        {description && (
          <p className="text-secondary mt-2 line-clamp-2 max-w-prose text-sm">
            {description}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-secondary space-y-1 text-sm">
            <p>Datum</p>
            <p className="text-foreground font-medium">
              {format(startDate, 'dd.MM.yyyy')}
            </p>
          </div>
          <div className="text-secondary space-y-1 text-sm">
            <p>Uhrzeit</p>
            <p className="text-foreground font-medium">
              {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
            </p>
          </div>
        </div>

        {added && (
          <div className="mt-6">
            <Label htmlFor={`${id}-cover-letter`}>Cover Letter</Label>
            {coverLetterRequirement !== 'NOT_REQUIRED' && (
              <Textarea
                id={`${id}-cover-letter`}
                required={coverLetterRequirement !== 'OPTIONAL'}
                className="mt-2 min-h-32"
                placeholder="Füge einen Cover Letter hinzu (optional)"
              />
            )}
            {coverLetterRequirement === 'NOT_REQUIRED' && (
              <div className="border-border mt-2 flex min-h-24 items-center justify-center rounded-lg border border-dashed p-4 text-center">
                <span className="text-secondary block text-sm">
                  Für diese Veranstaltung wird kein Cover Letter benötigt.
                </span>
              </div>
            )}
          </div>
        )}

        <Button
          data-type={added ? 'remove' : 'add'}
          className={cn(
            'mt-6 [&_svg:not([class*="size-"])]:size-4',
            'data-[type=add]:[&_svg:not([class*="text-"])]:text-success',
            'data-[type=remove]:[&_svg:not([class*="text-"])]:text-destructive'
          )}
          variant={'outline'}
          onClick={() => setAdded(!added)}
        >
          Veranstaltung{' '}
          {added ? (
            <>
              entfernen
              <MinusIcon />
            </>
          ) : (
            <>
              hinzufügen
              <PlusIcon />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
