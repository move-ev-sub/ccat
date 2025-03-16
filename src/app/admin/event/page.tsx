import { EventStatusToIcon } from '@/components/event-status-to-icon';
import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListBulletIcon, PlusIcon } from '@heroicons/react/16/solid';
import { Suspense } from 'react';
import { EventsList } from './_components/events-list';

/**
 * The admin overview page where all events are displayed.
 */
export default async function AdminOverviewPage() {
  return (
    <PageContainer>
      <PageHeader>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <PageTitle>Veranstaltungen</PageTitle>
            <PageDesc>
              Hier kannst du alle Veranstaltungen einsehen, bearbeiten und neue
              erstellen. Klicke auf eine Veranstaltung, um mehr Informationen zu
              erhalten.
            </PageDesc>
          </div>
          {/* @TODO: Link to CreateNewEvent Page */}
          <Button variant={'accent'}>
            Neu erstellen <PlusIcon />
          </Button>
        </div>
      </PageHeader>
      {/* <div className="bg-border mt-6 h-px w-full" /> */}
      <Tabs defaultValue="all" className="mt-to-header">
        <div className="container px-0 sm:px-8">
          <TabsList className="pl-8 sm:pl-0">
            <TabsTrigger value="all">
              <ListBulletIcon /> Alle
            </TabsTrigger>
            <TabsTrigger value="published">
              <EventStatusToIcon status="PUBLISHED" /> Veröffentlicht
            </TabsTrigger>
            <TabsTrigger value="drafts">
              <EventStatusToIcon status="DRAFT" /> Entwürfe
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
