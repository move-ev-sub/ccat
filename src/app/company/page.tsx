import { PageContainer } from '@/components/page-container';
import { PageDesc, PageTitle } from '@/components/page-header';
import { Suspense } from 'react';
import {
  SubEventsList,
  SubEventsListSkeleton,
} from './_components/sub-events-list';

export default async function CompanyOverviewPage() {
  return (
    <PageContainer>
      <header className="w-full px-8">
        <PageTitle>Willkommen zurück!</PageTitle>
        <PageDesc>
          Folgende Veranstaltungen sind derzeit aktiv und können von Ihnen
          bearbeitet werden.
        </PageDesc>
      </header>
      <div className="mt-to-header px-8">
        <Suspense fallback={<SubEventsListSkeleton />}>
          <SubEventsList />
        </Suspense>
      </div>
    </PageContainer>
  );
}
