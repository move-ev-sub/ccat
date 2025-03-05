import { cn } from '@/utils';
import { FolderIcon } from '@heroicons/react/24/outline';
import { Event } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { EventStatusToIcon } from '../event-status-to-icon';
import { Badge } from '../ui/badge';

interface EventThumbnailCardProps extends React.ComponentProps<typeof Link> {
  event: Event;
}

export async function EventThumbnailCard({
  className,
  event,
  ...props
}: EventThumbnailCardProps) {
  return (
    <Link
      className={cn(
        'border-border bg-background flex flex-col rounded-xl border p-6 shadow-xs',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-start">
        <FolderIcon className="text-secondary mr-auto mb-8 size-6" />
        {event.status == 'PUBLISHED' && (
          <Badge variant="success">
            <EventStatusToIcon status={event.status} />
            Veröffentlicht
          </Badge>
        )}
        {event.status == 'DRAFT' && (
          <Badge variant="default">
            <EventStatusToIcon status={event.status} />
            Entwurf
          </Badge>
        )}
        {event.status == 'ARCHIVED' && (
          <Badge variant="warn">
            <EventStatusToIcon status={event.status} />
            Archiviert
          </Badge>
        )}
      </div>

      <p className="text-foreground mt-auto text-sm font-medium">
        {event.name}
      </p>
      <p className="text-secondary mt-1 text-sm">Dezember 2025</p>
    </Link>
  );
}
