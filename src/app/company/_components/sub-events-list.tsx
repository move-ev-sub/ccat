import { Spinner } from '@/components/spinner';
import { SubEventThumbnailCard } from '@/components/sub-event-thumbnail-card';
import { cn } from '@/lib/utils/cn';
import { getOwnSubEvents } from '@/server/services/sub-event';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';

export async function SubEventsList({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const res = await getOwnSubEvents();

  if (!res.ok) {
    throw new Error(res.error);
  }

  const subEvents = res.data;

  return (
    <div
      data-slot={'sub-events-list'}
      className={cn(
        'relative grid grid-cols-3 gap-8 2xl:grid-cols-4',
        className
      )}
      {...props}
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
