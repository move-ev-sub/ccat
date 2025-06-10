import { Event } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import React from 'react';
import { EventPreviewCard } from './event-preview-card';

export function EventPreviewList({
  className,
  events,
  ...props
}: React.ComponentProps<'div'> & {
  events: Event[];
}) {
  return (
    <div
      data-slot="application-preview-list"
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
      {...props}
    >
      {events.map((event) => (
        <EventPreviewCard key={event.id} event={event} />
      ))}
      {events.length === 0 && <EventPreviewListEmpty />}
    </div>
  );
}

function EventPreviewListEmpty() {
  return (
    <div className="border-border-secondary col-span-4 flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
      <p className="text-foreground font-medium">
        Keine Veranstaltungen gefunden
      </p>
      <p className="text-secondary mt-2 text-sm">
        Wir haben noch keine Veranstaltungen für dich gefunden.
      </p>
    </div>
  );
}
