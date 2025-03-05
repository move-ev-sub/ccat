import { EventThumbnailCard } from '@/components/event-thumbnail-card/event-thumbnail-card';
import { NewEventCard } from '@/components/new-event-card';
import { PageContainer } from '@/components/page-container';
import { PageTitle } from '@/components/page-header';
import { getAllEvents } from '@/server/actions/event';
import { cn } from '@/utils';
import {
  ArchiveBoxIcon,
  CalendarIcon,
  EyeIcon,
  InboxIcon,
} from '@heroicons/react/16/solid';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import React from 'react';

/**
 * The admin overview page where all events are displayed.
 */
export default async function AdminOverviewPage() {
  const events = await getAllEvents();

  // TODO: Implement better error handling
  if (events.error) {
    console.error(events.error);
  }

  return (
    <PageContainer>
      <PageTitle>Veranstaltungen</PageTitle>
      <TabsPrimitive.Tabs className="mt-12" defaultValue="published">
        <TabsPrimitive.List className="flex flex-wrap items-center justify-start gap-2.5">
          <EventsTabsTrigger value="all">
            <CalendarIcon className="size-4" />
            Alle
          </EventsTabsTrigger>
          <EventsTabsTrigger value="published">
            <EyeIcon className="size-4" />
            Veröffentlicht
          </EventsTabsTrigger>
          <EventsTabsTrigger value="draft">
            <InboxIcon className="size-4" />
            Entwürfe
          </EventsTabsTrigger>
          <EventsTabsTrigger value="archived">
            <ArchiveBoxIcon className="size-4" />
            Archiviert
          </EventsTabsTrigger>
        </TabsPrimitive.List>
        <div className="mt-8">
          <TabsPrimitive.Content
            value="all"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <NewEventCard href={'/admin/new/event'} />

            {events.data &&
              events.data.map((event) => (
                <EventThumbnailCard
                  href={`/admin/event/${event.id}`}
                  key={event.id}
                  event={event}
                />
              ))}
          </TabsPrimitive.Content>
          <TabsPrimitive.Content
            value="published"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <NewEventCard href={'/admin/new/event'} />

            {events.data &&
              events.data
                .filter((event) => event.status === 'PUBLISHED')
                .map((event) => (
                  <EventThumbnailCard
                    href={`/admin/event/${event.id}`}
                    key={event.id}
                    event={event}
                  />
                ))}
          </TabsPrimitive.Content>
          <TabsPrimitive.Content
            value="draft"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <NewEventCard href={'/admin/new/event'} />

            {events.data &&
              events.data
                .filter((event) => event.status === 'DRAFT')
                .map((event) => (
                  <EventThumbnailCard
                    href={`/admin/event/${event.id}`}
                    key={event.id}
                    event={event}
                  />
                ))}
          </TabsPrimitive.Content>
          <TabsPrimitive.Content
            value="archived"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <NewEventCard href={'/admin/new/event'} />

            {events.data &&
              events.data
                .filter((event) => event.status === 'ARCHIVED')
                .map((event) => (
                  <EventThumbnailCard
                    href={`/admin/event/${event.id}`}
                    key={event.id}
                    event={event}
                  />
                ))}
          </TabsPrimitive.Content>
        </div>
      </TabsPrimitive.Tabs>
    </PageContainer>
  );
}

function EventsTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'text-foreground border-border data-[state=active]:border-accent data-[state=active]:text-accent data-[state=active]:bg-accent-50 dark:data-[state=active]:bg-accent-950 focus-visible:ring-offset-background focus-visible:ring-ring flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className
      )}
      {...props}
    />
  );
}
