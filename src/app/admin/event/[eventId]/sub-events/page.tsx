import { TooltipTitle } from '@/app/test/tooltip';
import { PageContainer } from '@/components/page-container';
import { PageDesc, PageTitle } from '@/components/page-header';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipDescription,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  canCreateSubEvent,
  getSubEventsForEvent,
} from '@/features/sub-event/services/subEventService';
import { SubEventsList } from '@/features/sub-event/ui/sub-events-list';
import { PlusIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

async function fetchData({ eventId }: { eventId: string }) {
  const canCreateSubEventRes = await canCreateSubEvent({ eventId });

  if (!canCreateSubEventRes.ok) {
    throw new Error(canCreateSubEventRes.error);
  }

  const res = await getSubEventsForEvent({ eventId });

  if (!res.ok) {
    throw new Error(res.error);
  }

  return {
    canCreateSubEvent: canCreateSubEventRes.data,
    subEvents: res.data,
  };
}

export default async function AdminSubEventsPage({
  params: paramsPromise,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await paramsPromise;

  const data = await fetchData({ eventId });

  return (
    <PageContainer>
      <header className="border-border flex flex-wrap items-center justify-between gap-8 border-b px-8 pb-12">
        <div>
          <PageTitle>Unterveranstaltungen</PageTitle>
          <PageDesc>
            Erstelle und verwalte Unterveranstaltungen für diese Veranstaltung.
          </PageDesc>
        </div>

        {data.canCreateSubEvent ? (
          <Button
            variant={'outline'}
            className="text-foreground shrink-0"
            asChild
          >
            <Link href={`/admin/new/sub-event?eventId=${eventId}`}>
              Neu erstellen <PlusIcon />
            </Link>
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger tabIndex={-1} aria-disabled={true}>
              <span
                className={buttonVariants({
                  variant: 'outline',
                  className:
                    'hover:!bg-background shrink-0 !cursor-not-allowed opacity-70 focus-visible:outline-0',
                })}
                tabIndex={-1}
                aria-disabled={true}
              >
                Neu erstellen <PlusIcon />
              </span>
            </TooltipTrigger>
            <TooltipContent className="max-w-80 text-center">
              <TooltipTitle>Nicht verfügbar</TooltipTitle>
              <TooltipDescription>
                Um eine Unterveranstaltung zu erstellen, wird mindestens ein
                Slot und ein Unternehmen benötigt.
              </TooltipDescription>
            </TooltipContent>
          </Tooltip>
        )}
      </header>
      <section className="mt-to-header px-8">
        <SubEventsList subEvents={data.subEvents} hrefFn={() => `#`} />
      </section>
    </PageContainer>
  );
}
