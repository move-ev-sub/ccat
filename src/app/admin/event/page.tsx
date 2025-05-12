import { CreateEventDialog } from '@/components/create-event-dialog';
import { EventStatusToIcon } from '@/components/event-status-to-icon';
import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { messages as t } from '@/i18n';
import { ListBulletIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { EventsList } from './_components/events-list';

export const metadata: Metadata = {
  title: 'Veranstaltungen',
  description: 'Alle bisherigen und aktuellen Veranstaltungen.',
};

/**
 * The admin overview page where all events are displayed.
 */
export default async function AdminOverviewPage() {
  return (
    <PageContainer>
      <PageHeader>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <PageTitle>{t.pages.events.title()}</PageTitle>
            <PageDesc>{t.pages.events.description()}</PageDesc>
          </div>
          {/* @TODO: Link to CreateNewEvent Page */}
          <CreateEventDialog />
        </div>
      </PageHeader>
      {/* <div className="bg-border mt-6 h-px w-full" /> */}
      <Tabs defaultValue="all" className="mt-to-header">
        <div className="container px-0 sm:px-8">
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
        <Suspense
          fallback={
            <div className="mt-to-header container grid grid-cols-2 gap-8">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          }
        >
          <EventsList />
        </Suspense>
      </Tabs>
    </PageContainer>
  );
}
