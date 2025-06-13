'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SubEvent } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/16/solid';
import { format } from 'date-fns';
import React from 'react';
import { Selection, useApplicationStore } from '../stores/application.store';

/**
 * Renders a card that displays information about a sub event. The user can
 * add or remove a sub event from the application (selection) by clicking the
 * Action Button.
 *
 * Via the Details Dialog, the user can open a dialog that displays more
 * information about the sub event.
 *
 * @example
 * ```tsx
 * <SubEventSelectCard subEvent={subEvent} />
 * ```
 *
 * @param props - The props of the component.
 * @param props.subEvent - The sub event to display information about.
 *
 * @returns The component.
 */
export function SubEventSelectCard({
  subEvent,
  className,
  ...props
}: React.ComponentProps<typeof Card> & {
  /**
   * The sub event to display information about and add to the application.
   */
  subEvent: SubEvent;
}) {
  const { isSubEventAdded, slots, addSelection, removeSelection } =
    useApplicationStore((state) => state);

  // a unique id for the card
  const id = React.useId();

  // whether the sub event is added to the application
  const [isAdded, setIsAdded] = React.useState<boolean>(false);
  const { slotId, name, coverLetterRequirement, startDate, endDate } = subEvent;

  React.useEffect(() => {
    setIsAdded(isSubEventAdded(slotId, subEvent.id));
  }, [isSubEventAdded, subEvent.id, subEvent.slotId, slots, slotId]);

  const selection: Selection = {
    slotId,
    id: subEvent.id,
    subEventName: name,
    subEventDescription: subEvent.description ?? '',
    coverLetterRequirement,
    startDate,
    endDate,
  };

  return (
    <Card
      id={id}
      data-slot={'sub-event-select-card'}
      data-selected={isAdded}
      className={cn(className, 'group')}
      {...props}
    >
      <CardHeader className="group-data-[selected=true]:bg-accent py-0.75"></CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-foreground font-medium">{name}</p>
          <Badge variant={!isAdded ? 'default' : 'accent'}>Interview</Badge>
        </div>

        <ul className="text-secondary mt-4 space-y-2 text-sm">
          <SubEventSelectCardListItem>
            <CalendarIcon />
            {format(new Date(startDate), 'dd.MM.yyyy')}
          </SubEventSelectCardListItem>
          <SubEventSelectCardListItem>
            <ClockIcon />
            {format(new Date(startDate), 'HH:mm')} -{' '}
            {format(new Date(endDate), 'HH:mm')}
          </SubEventSelectCardListItem>
          <SubEventSelectCardListItem>
            <MapPinIcon />
            Not implemented yet
          </SubEventSelectCardListItem>
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <SubEventSelectCardDetails subEvent={subEvent} />
          <SubEventSelectCardAction
            isAdded={isAdded}
            onClick={() => {
              if (isAdded) {
                removeSelection(slotId, selection.id);
              } else {
                addSelection(selection);
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// #region SubEventSelectCardListItem
// ========================================================
function SubEventSelectCardListItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot={'sub-event-select-card-list-item'}
      className={cn(
        "flex items-center justify-start gap-2 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

// #region SubEventSelectCardAction
// ========================================================
export function SubEventSelectCardAction({
  className,
  isAdded,
  ...props
}: React.ComponentProps<typeof Button> & {
  isAdded?: boolean;
}) {
  return (
    <Button
      data-slot="sub-event-select-card-action"
      className={cn(className)}
      {...props}
    >
      {isAdded ? (
        <>
          <MinusIcon />
          Entfernen
        </>
      ) : (
        <>
          <PlusIcon />
          Hinzufügen
        </>
      )}
    </Button>
  );
}

// #region SubEventSelectCardDetails
// ========================================================
export function SubEventSelectCardDetails({
  subEvent,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  subEvent: SubEvent;
}) {
  const { name, description } = subEvent;

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button variant="outline">Mehr Informationen</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
