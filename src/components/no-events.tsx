import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { PlusIcon } from '@heroicons/react/16/solid';
import React from 'react';

export function NoEvents({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot={'no-events'}
      className={cn('relative isolate grid gap-8 lg:grid-cols-2', className)}
      {...props}
    >
      <PlaceholderCards />

      <div className="from-background/20 to-background absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-b text-center">
        <p className="text-foreground font-semibold">
          Keine Veranstaltungen gefunden
        </p>
        <p className="text-secondary mt-2 max-w-prose text-sm">
          Erstelle eine neue Veranstaltung, um sie hier anzuzeigen.
        </p>
        <Button className="mt-6">
          Neu erstellen <PlusIcon />
        </Button>
      </div>
    </div>
  );
}

export function NoEventsForFilter({
  className,
  filterName,
  ...props
}: React.ComponentProps<'div'> & { filterName?: string }) {
  return (
    <div
      data-slot={'no-events-for-filter'}
      className={cn('relative isolate grid gap-8 lg:grid-cols-2', className)}
      {...props}
    >
      <PlaceholderCards />

      <div className="from-background/20 to-background absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-b text-center">
        <p className="text-foreground font-semibold">
          Keine Veranstaltungen für{' '}
          {filterName ? `den Filter "${filterName}"` : 'diesen Filter'} gefunden
        </p>
        <p className="text-secondary mt-2 max-w-prose text-sm">
          Wechsle den Filter oder erstelle eine neue Veranstaltung, um sie hier
          anzuzeigen.
        </p>
      </div>
    </div>
  );
}

function PlaceholderCards() {
  return (
    <>
      <PlaceholderCard />
      <PlaceholderCard />
      <PlaceholderCard className="hidden lg:block" />
      <PlaceholderCard className="hidden lg:block" />
    </>
  );
}

function PlaceholderCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot={'placeholder-card'}
      className={cn('bg-background-muted h-32 w-full rounded-md', className)}
      {...props}
    />
  );
}
