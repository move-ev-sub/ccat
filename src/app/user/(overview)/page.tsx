import { PageContainer } from '@/components/page-container';
import { PageDesc, PageTitle } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { getOwnApplications } from '@/features/application/services/applicationService';
import { ApplicationPreviewList } from '@/features/application/ui/application-preview-list';
import { getPublishedEvents } from '@/features/event/services/eventService';
import { EventPreviewList } from '@/features/event/ui/event-preview-list';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Benutzerübersicht',
  description: 'Alle Veranstaltungen, welche derzeit verfügbar sind.',
};

export default async function UserOverviewPage() {
  const publishedEvents = await getPublishedEvents();

  if (!publishedEvents.ok) {
    throw new Error(publishedEvents.error);
  }

  const applications = await getOwnApplications();

  if (!applications.ok) {
    throw new Error(applications.error);
  }

  return (
    <PageContainer>
      <div className="border-b px-8 pb-12">
        <PageTitle>Übersicht</PageTitle>
        <PageDesc>
          Hier siehst du alle Veranstaltungen, welche du derzeit verfügbar
        </PageDesc>
      </div>
      <section className="px-8 py-12">
        <p className="text-foreground text-lg font-medium">Deine Bewerbungen</p>
        <ApplicationPreviewList
          className="mt-8"
          applications={applications.data}
        />
        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="border-border-secondary col-span-4 flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <p className="text-foreground font-medium">
              Du hast noch keine Bewerbungen abgegeben
            </p>
            <p className="text-secondary mt-2 text-sm">
              Wähle eine Veranstaltung aus, um eine Bewerbung zu erstellen.
            </p>
          </div>
          <div className="border-border-secondary group relative rounded-md border p-6 shadow-sm">
            <div className="flex flex-wrap-reverse items-center justify-between gap-2">
              <p className="text-foreground font-medium">
                Consulting Contact 2025
              </p>
              <Badge>
                <span className="bg-primary-400 ml-0.5 size-2 rounded-full" />
                Entwurf
              </Badge>
            </div>
            <div className="mt-4 space-y-4">
              <p className="text-secondary text-sm">
                Zuletzt bearbeitet am 29.05.2025, 12:00 Uhr
              </p>
            </div>
            <Link
              href={'/'}
              className="text-accent focus-indicator mt-6 flex w-fit items-center justify-center gap-1.5 rounded-md text-sm font-medium"
            >
              <span className="absolute inset-0" />
              Bearbeiten{' '}
              <ArrowRightIcon className="size-4 transition-transform will-change-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div> */}
      </section>
      <Separator />
      <section className="px-8 py-12">
        <p className="text-foreground text-lg font-medium">
          Aktuelle Veranstaltungen
        </p>
        <EventPreviewList className="mt-8" events={publishedEvents.data} />
      </section>
    </PageContainer>
  );
}
