import { cn } from '@/utils';
import {
  ArchiveBoxIcon,
  CheckIcon,
  InboxIcon,
} from '@heroicons/react/16/solid';
import { FolderIcon } from '@heroicons/react/24/outline';
import { Event } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
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
            <CheckIcon />
            Veröffentlicht
          </Badge>
        )}
        {event.status == 'DRAFT' && (
          <Badge variant="default">
            <InboxIcon />
            Entwurf
          </Badge>
        )}
        {event.status == 'ARCHIVED' && (
          <Badge variant="warn">
            <ArchiveBoxIcon />
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
