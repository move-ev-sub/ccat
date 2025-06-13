import { PageContainer } from '@/components/page-container';
import { PageDesc, PageTitle } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getEventById } from '@/features/event/services/eventService';
import { PlusIcon } from '@heroicons/react/16/solid';
import { PhasesCard } from './_components/phases-card';

export default async function AdminEventOverviewPage({
  params,
}: {
  params: Promise<{
    eventId: string;
  }>;
}) {
  const eventId = (await params).eventId;

  const res = await getEventById(eventId);

  if (!res.ok) {
    throw new Error(res.error);
  }

  const { name } = res.data;

  return (
    <PageContainer>
      <header className="px-8 pb-12">
        <div className="flex flex-wrap justify-between gap-6">
          {/* Page Title */}
          <div>
            <PageTitle>{name}</PageTitle>
            <PageDesc>
              Eine Überblick über die Veranstaltung. Hier kannst du alle
              Bewerbungen einsehen, bearbeiten und neue erstellen.
            </PageDesc>
          </div>
          <Button variant={'outline'} className="shrink-0">
            Neu erstellen <PlusIcon />
          </Button>
        </div>
      </header>
      <Separator />
      <div className="mt-12 px-8">
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="relative">
            <CardContent>
              <p className="text-foreground text-base font-medium">
                Bewerbungen
              </p>
              <p className="text-secondary mt-1 text-sm">Seit Beginn</p>
              <div className="border-border bg-background-muted mt-4 h-24 rounded-sm border"></div>
            </CardContent>
          </Card>
          <PhasesCard eventId={eventId} />
        </div>
      </div>
    </PageContainer>
  );
}
