import { PageContainer } from '@/components/page-container';
import { PageDesc, PageTitle } from '@/components/page-header';
import { getOwnSubEvents } from '@/features/sub-event/services/subEventService';
import { SubEventsList } from '@/features/sub-event/ui/sub-events-list';
import { cn } from '@/lib/utils/cn';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function CompanyOverviewPage() {
  const res = await getOwnSubEvents();

  if (!res.ok) {
    throw new Error(res.error);
  }

  const subEvents = res.data;

  return (
    <PageContainer>
      <header className="w-full px-8">
        <PageTitle>Willkommen zurück!</PageTitle>
        <PageDesc>
          Folgende Veranstaltungen sind derzeit aktiv und können von Ihnen
          bearbeitet werden.
        </PageDesc>
      </header>
      <div
        data-slot={'sub-events-list'}
        className={cn(
          'mt-to-header relative grid grid-cols-3 gap-8 px-8 2xl:grid-cols-4'
        )}
      >
        <SubEventsList subEvents={subEvents} hrefFn={() => '#'} />
      </div>
    </PageContainer>
  );
}
