import { SubEvent } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import React from 'react';
import { SubEventCard } from './sub-event-card';

interface SubEventsListProps extends React.ComponentProps<'div'> {
  subEvents: SubEvent[];
  hrefFn: (eventId: string, subEventId: string) => string;
}

/**
 * Users can filter all subevents of an event by searching for them.
 */
export function SubEventsList({
  subEvents,
  className,
  hrefFn,
  ...props
}: SubEventsListProps) {
  return (
    <>
      <div
        data-slot={'sub-events-list'}
        className={cn(
          'mt-8 grid gap-8 lg:grid-cols-2 xl:grid-cols-3',
          className
        )}
        {...props}
      >
        {subEvents.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center text-center lg:col-span-2 xl:col-span-3">
            <p className="text-foreground font-medium">
              Es wurden keine Unterveranstaltungen gefunden.
            </p>
            <p className="text-secondary mt-2 max-w-prose text-sm">
              Derzeit konnten in der Datenbank leider keine passenden
              Unterveranstaltungen für diese Veranstaltung gefunden werden.
            </p>
          </div>
        ) : (
          subEvents.map((subEvent) => (
            <SubEventCard
              key={subEvent.id}
              subEvent={subEvent}
              href={hrefFn(subEvent.eventId, subEvent.id)}
            />
          ))
        )}
      </div>
    </>
  );
}
