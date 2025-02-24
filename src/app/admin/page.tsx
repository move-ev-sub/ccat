import { EventThumbnailCard } from '@/components/event-thumbnail-card/event-thumbnail-card';
import { NewEventCard } from '@/components/new-event-card';
import { getAllEvents } from '@/server/actions/event';

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
    <section className="py-20">
      <div className="container">
        <h1 className="text-foreground text-xl font-medium">Veranstaltungen</h1>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <NewEventCard href={'/admin/events/new'} />
          {events.data &&
            events.data.map((event) => (
              <EventThumbnailCard href={'#'} key={event.id} event={event} />
            ))}
        </div>
      </div>
    </section>
  );
}
