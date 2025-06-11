'use client';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { NoEventsFound } from '@/features/application/ui/empty-states';
import {
  BackButton,
  ForwardButton,
  StepsNavigation,
} from '@/flows/_lib/steps/steps-navigation';
import { SubEvent } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import React from 'react';
import { Selection, useApplicationStore } from '../../stores/application.store';
import { SubEventSelectCard } from '../sub-event-select-card';

export function SelectForm({
  subEvents,
  className,
  ...props
}: React.ComponentProps<'section'> & {
  /**
   * The available sub events for the given event.
   */
  subEvents: SubEvent[];
}) {
  const { slots } = useApplicationStore((state) => state);

  // Search filter for the sub events
  const [search, setSearch] = React.useState('');

  // filtered sub events based on the search query
  const filteredSubEvents = subEvents.filter((subEvent) =>
    subEvent.name.toLowerCase().includes(search.toLowerCase())
  );

  // an array of all the selections made by the user
  const flattendSelections: Selection[] = Object.values(slots).flatMap(
    (slot) => slot.selections
  );

  return (
    <section data-slot="sub-events-list" className={cn(className)} {...props}>
      <Input
        placeholder="Suche nach einem Event"
        className="max-w-72"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-to-header grid grid-cols-2 gap-8">
        {filteredSubEvents.map((subEvent) => (
          <SubEventSelectCard subEvent={subEvent} key={subEvent.id} />
        ))}
        {filteredSubEvents.length === 0 && (
          <NoEventsFound className="col-span-2" />
        )}
      </div>

      <Separator className="my-12" />
      <StepsNavigation>
        <BackButton />
        <ForwardButton
          type="submit"
          disabled={flattendSelections.length === 0}
        />
      </StepsNavigation>
    </section>
  );
}
