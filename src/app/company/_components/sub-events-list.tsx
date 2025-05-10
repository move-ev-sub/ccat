import { Spinner } from '@/components/spinner';
import { SubEventThumbnailCard } from '@/components/sub-event-thumbnail-card';
import { getOpenSubEventsForCompany } from '@/server/services/sub-event';
import { cn } from '@/utils';

export async function SubEventsList({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const res = await getOpenSubEventsForCompany({
    companyId: '963fcdce-0ab8-40f0-809c-72aa715730c4',
  });

  if (!res.ok) {
    throw new Error(res.error);
  }

  const subEvents = res.data;

  return (
    <div
      data-slot={'sub-events-list'}
      className={cn('grid grid-cols-3 gap-8 2xl:grid-cols-4', className)}
      {...props}
    >
      {subEvents.map((subEvent) => (
        <SubEventThumbnailCard
          key={subEvent.id}
          subEvent={subEvent}
          href={`/company/sub-events/${subEvent.id}`}
        />
      ))}
    </div>
  );
}

export function SubEventsListSkeleton({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot={'sub-events-list-skeleton'}
      className={cn('relative w-full', className)}
      role="status"
      {...props}
    >
      <div className="grid grid-cols-3 gap-8 2xl:grid-cols-4">
        <div className="border-border h-48 rounded-md border border-dashed" />
        <div className="border-border h-48 rounded-md border border-dashed" />
        <div className="border-border h-48 rounded-md border border-dashed" />
        <div className="border-border h-48 rounded-md border border-dashed" />
        <div className="border-border h-48 rounded-md border border-dashed" />
        <div className="border-border h-48 rounded-md border border-dashed" />
        <div className="border-border h-48 rounded-md border border-dashed" />
        <div className="border-border h-48 rounded-md border border-dashed" />
      </div>
      <div className="from-background to-background/20 absolute inset-0 container flex min-h-72 max-w-prose flex-col items-center justify-center bg-radial text-center">
        <Spinner />

        <p className="text-foreground mt-8 text-base font-medium">
          Veranstaltungen werden geladen
        </p>
      </div>
    </div>
  );
}
