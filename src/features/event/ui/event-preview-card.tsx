import { Event } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React from 'react';

export function EventPreviewCard({
  className,
  event,
  ...props
}: React.ComponentProps<'div'> & {
  event: Event;
}) {
  return (
    <div
      data-slot={'event-preview-card'}
      className={cn(
        'border-border-secondary hover:bg-background-muted group relative rounded-lg border p-6 shadow-sm transition-colors',
        className
      )}
      {...props}
    >
      <p className="text-foreground font-medium">{event.name}</p>
      <p className="text-secondary mt-2 line-clamp-2 text-sm">
        {event.description}
      </p>
      <Link
        href={`/user/event/${event.id}`}
        className="text-accent focus-indicator mt-6 flex w-fit items-center justify-center gap-1.5 rounded-md text-sm font-medium"
      >
        <span className="absolute inset-0" />
        Jetzt bewerben{' '}
        <ArrowRightIcon className="size-4 transition-transform will-change-transform group-hover:translate-x-1.5" />
      </Link>
    </div>
  );
}
