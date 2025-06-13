import { Navbar } from '@/components/layout/navbar';
import { PageContainer } from '@/components/page-container';
import { PageDesc, PageTitle } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllNonArchivedEvents } from '@/features/event/services/eventService';
import { CreateEventDialog } from '@/features/event/ui/create-event-dialog';
import { EventsList } from '@/features/event/ui/event-list';
import { EventStatusToIcon } from '@/features/event/ui/event-status-to-icon';
import { messages as t } from '@/i18n';
import { AdminRoutes } from '@/lib/consts/routes';
import { ListBulletIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Veranstaltungen',
  description: 'Alle bisherigen und aktuellen Veranstaltungen.',
};

/**
 * The admin overview page where all events are displayed.
 */
export default async function AdminOverviewPage() {
  const res = await getAllNonArchivedEvents();

  if (!res.ok) {
    throw new Error(res.error);
  }

  const events = res.data;

  return (
    <>
      <Navbar
        breadcrumbs={[
          {
            label: 'Veranstaltungen',
            href: AdminRoutes.EVENTS,
          },
        ]}
      />
      <PageContainer>
        <header className="px-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <PageTitle>{t.pages.events.title()}</PageTitle>
              <PageDesc>{t.pages.events.description()}</PageDesc>
            </div>
            {/* @TODO: Link to CreateNewEvent Page */}
            <CreateEventDialog />
          </div>
        </header>
        <Separator className="my-12" />
        {/* <div className="bg-border mt-6 h-px w-full" /> */}
        <Tabs defaultValue="all">
          <div className="px-8">
            <TabsList className="pl-8 sm:pl-0">
              <TabsTrigger value="all">
                <ListBulletIcon /> {t.pages.events.allEvents()}
              </TabsTrigger>
              <TabsTrigger value="published">
                <EventStatusToIcon status="PUBLISHED" />{' '}
                {t.pages.events.publishedEvents()}
              </TabsTrigger>
              <TabsTrigger value="drafts">
                <EventStatusToIcon status="DRAFT" />{' '}
                {t.pages.events.draftEvents()}
              </TabsTrigger>
            </TabsList>
          </div>

          <EventsList events={events} />
        </Tabs>
      </PageContainer>
    </>
  );
}
