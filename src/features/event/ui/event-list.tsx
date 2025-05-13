import { NoEvents, NoEventsForFilter } from '@/components/no-events';
import { TabsContent } from '@/components/ui/tabs';
import { EventThumbnailCard } from '@/features/event/ui/event-card';
import { Event } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';

interface EventsListProps extends React.ComponentProps<'div'> {
  events: Event[];
}

export async function EventsList({
  events,
  className,
  ...props
}: EventsListProps) {
  const publishedEvents = events.filter(
    (event) => event.status === 'PUBLISHED'
  );
  const draftEvents = events.filter((event) => event.status === 'DRAFT');

  if (events.length === 0) {
    return (
      <div className="container pt-8">
        <NoEvents />
      </div>
    );
  }

  return (
    <div className={cn('container pt-8', className)} {...props}>
      <TabsContent asChild value="all">
        <div className="relative isolate grid gap-8 lg:grid-cols-2">
          {events.map((event) => (
            <EventThumbnailCard key={event.id} event={event} />
          ))}
        </div>
      </TabsContent>
      <TabsContent asChild value="published">
        {publishedEvents.length === 0 ? (
          <NoEventsForFilter filterName="Veröffentlicht" />
        ) : (
          <div className="relative isolate grid gap-8 lg:grid-cols-2">
            {publishedEvents.map((event) => (
              <EventThumbnailCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </TabsContent>
      <TabsContent asChild value="drafts">
        {draftEvents.length === 0 ? (
          <NoEventsForFilter filterName="Entwürfe" />
        ) : (
          <div className="relative isolate grid gap-8 lg:grid-cols-2">
            {draftEvents.map((event) => (
              <EventThumbnailCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </TabsContent>
    </div>
  );
}
