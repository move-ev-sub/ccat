'use client';

import { cn } from '@/lib/utils/cn';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import React from 'react';
import { Selection, SlotEntry } from '../stores/application.store';

// #region Prioritize Group
// ======================================================================================

/**
 * A Prioritize Group is a form component that renders a group of radio buttons, each
 * representing a selection in a slot. The user can select one of the selections as
 * their prioritized selection for the slot.
 */
export function PrioritizeGroup({
  className,
  slotEntry,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
  slotEntry: SlotEntry;
}) {
  const { id, selections } = slotEntry;

  return (
    <section id={`prioritize-${id}`}>
      <RadioGroupPrimitive.Root
        className={cn('mt-6 grid grid-cols-3 gap-8', className)}
        {...props}
      >
        {selections.map((selection) => (
          <PrioritizeItem
            key={selection.id}
            value={selection.id}
            selection={selection}
          />
        ))}
      </RadioGroupPrimitive.Root>
    </section>
  );
}

// #region PrioritizeItem
// =======================================================
/**
 * A Prioritize Item is a Radio Group Item that renders a selection in a slot. This is used
 * within a Prioritize Group to render a selection in a slot.
 */
export function PrioritizeItem({
  className,
  selection,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  selection: Selection;
}) {
  const { subEventName, subEventDescription } = selection;

  return (
    <RadioGroupPrimitive.Item
      data-slot="prioritize-item"
      className={cn(
        'border-border group block rounded-md border px-6 py-4 text-start text-sm transition-colors',
        'data-[state=checked]:border-accent/70',
        'focus:ring-accent/30 focus:ring-2 focus:outline-none',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'border-border-secondary bg-background ml-auto flex size-4 items-center justify-center rounded-full border transition-colors',
          'group-data-[state=checked]:border-accent group-data-[state=checked]:bg-accent'
        )}
      >
        <span className="bg-background size-2 rounded-full" />
      </span>
      <span className="text-foreground mt-4 block font-medium">
        {subEventName}
      </span>
      <p className="text-secondary mt-1 block max-w-full truncate">
        {subEventDescription}
      </p>
    </RadioGroupPrimitive.Item>
  );
}
