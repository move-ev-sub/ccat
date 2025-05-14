import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';
import { format } from 'date-fns';
import React from 'react';
import { Selection, SlotEntry } from '../stores/application.store';

// #region SelectionsReviewGroup
// ======================================================================================

/**
 * Renders a group of {@link SelectionReviewCard}s for a given slot entry.
 *
 * @example
 * ```tsx
 * <SelectionsReviewGroup slotEntry={slotEntry} />
 * ```
 *
 * @param props - The props of the component.
 * @param props.slotEntry - The slot entry to render the selection review cards for.
 */
export function SelectionsReviewGroup({
  slotEntry,
  ...props
}: React.ComponentProps<'div'> & {
  /**
   * The slot entry to render the selection review cards for.
   */
  slotEntry: SlotEntry;
}) {
  const { startDate, endDate, selections, prioritizedSelection } = slotEntry;
  return (
    <div {...props}>
      <h3 className="text-foreground font-medium">
        {format(startDate, 'dd.MM.yyyy, HH:mm')} - {format(endDate, 'HH:mm')}
      </h3>
      <div className="mt-6 grid grid-cols-2 gap-8">
        {selections.map((selection) => (
          <SelectionReviewCard
            key={selection.id}
            selection={selection}
            isPrioritized={prioritizedSelection === selection.id}
          />
        ))}
      </div>
    </div>
  );
}

// #region SelectionsReviewGroup
// ======================================================================================

/**
 * Renders a card that displays information about a selection. This can be used
 * to review the selections that a user has made for a given slot entry. When a selection
 * is prioritized, a badge is displayed in the top right corner of the card.
 *
 * @example
 * ```tsx
 * <SelectionReviewCard selection={selection} isPrioritized={isPrioritized} />
 * ```
 *
 * @param props - The props of the component.
 */
export function SelectionReviewCard({
  selection,
  isPrioritized,
  className,
  ...props
}: React.ComponentProps<typeof Card> & {
  /**
   * The selection to display information about.
   */
  selection: Selection;

  /**
   * Whether the selection is the prioritized selection for the slot entry.
   */
  isPrioritized: boolean;
}) {
  return (
    <Card
      data-prioritized={isPrioritized}
      className={cn(
        'group data-[prioritized=true]:border-accent/70',
        className
      )}
      {...props}
    >
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex items-center justify-between">
          <CardTitle>{selection.subEventName}</CardTitle>
          {isPrioritized && <Badge variant={'accent'}>Priorisiert</Badge>}
        </div>
        <div className="space-y-1 text-sm">
          <p className="text-secondary">Datum</p>
          <p className="text-foreground font-medium">
            {format(selection.startDate, 'dd.MM.yyyy')}
          </p>
        </div>
        <div className="space-y-1 text-sm">
          <p className="text-secondary">Uhrzeit</p>
          <p className="text-foreground font-medium">
            {format(selection.startDate, 'HH:mm')}
          </p>
        </div>
        <div className="col-span-2 space-y-1 text-sm">
          <p className="text-secondary">Anschreiben</p>
          <p className="text-foreground font-medium">
            {selection.coverLetter ? 'Angehängt' : 'Kein Anschreiben angegeben'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
