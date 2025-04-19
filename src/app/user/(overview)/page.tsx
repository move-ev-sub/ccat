import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { PublicEventThumbnailCard } from '@/components/public-event-thumbnail-card';
import { getPublishedEvents } from '@/server/services/event';
import { Metadata } from 'next';
import NoPublishedEvents from './_components/no-published-events';

export const metadata: Metadata = {
  title: 'Benutzerübersicht',
  description: 'Alle Veranstaltungen, welche derzeit verfügbar sind.',
};

export default async function UserOverviewPage() {
  const publishedEvents = await getPublishedEvents();

  if (!publishedEvents.ok) {
    throw new Error(publishedEvents.error);
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Veranstaltungen</PageTitle>
        <PageDesc>
          Hier siehst du alle Veranstaltungen, welche derzeit verfügbar sind.
        </PageDesc>
      </PageHeader>
      <div className="mt-to-header container grid gap-8 lg:grid-cols-2">
        {publishedEvents.data.map((event) => (
          <PublicEventThumbnailCard key={event.id} event={event} />
        ))}
        {publishedEvents.data.length === 0 && <NoPublishedEvents />}
      </div>
    </PageContainer>
  );
}
