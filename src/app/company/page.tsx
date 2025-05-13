import { PageContainer } from '@/components/page-container';
import { PageDesc, PageTitle } from '@/components/page-header';
import { SubEventThumbnailCard } from '@/components/sub-event-thumbnail-card';
import { getOwnSubEvents } from '@/features/sub-event/services/subEventService';
import { cn } from '@/lib/utils/cn';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';

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
        {subEvents.length === 0 ? (
          <SubEventsListEmpty />
        ) : (
          subEvents.map((subEvent) => (
            <SubEventThumbnailCard
              key={subEvent.id}
              subEvent={subEvent}
              href={`/company/sub-events/${subEvent.id}`}
            />
          ))
        )}
      </div>
    </PageContainer>
  );
}

export function SubEventsListEmpty({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <>
      <div className="border-border h-48 rounded-md border" />
      <div className="border-border h-48 rounded-md border" />
      <div className="border-border h-48 rounded-md border" />
      <div className="border-border h-48 rounded-md border" />
      <div className="border-border h-48 rounded-md border" />
      <div className="border-border h-48 rounded-md border" />
      <div className="border-border h-48 rounded-md border" />
      <div className="border-border h-48 rounded-md border" />

      <div
        data-slot={'sub-events-list-empty'}
        className={cn(
          'from-background to-background/20 absolute inset-0 col-span-3 flex min-h-72 w-full flex-col items-center justify-center bg-radial text-center 2xl:col-span-4',
          className
        )}
        {...props}
      >
        <ArchiveBoxIcon className="text-accent size-6" />
        <p className="text-foreground mt-6 text-base font-medium">
          Keine Veranstaltungen gefunden
        </p>
        <p className="text-secondary mt-2 max-w-prose text-sm">
          Es sieht so aus, als wären derzeit keine Veranstaltungen verfügbar.
          Wenn Sie denken, dass dies ein Fehler ist, kontaktieren Sie uns bitte.
        </p>
      </div>
    </>
  );
}
