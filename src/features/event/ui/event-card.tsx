import { Pinger } from '@/components/pinger';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardLink,
  CardTitle,
} from '@/components/ui/card';
import { Event } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import { CalendarIcon } from '@heroicons/react/16/solid';
import { format } from 'date-fns';
import React from 'react';
/**
 * The EventThumbnailCard component displays a preview of an event which
 * is used in the admin dashboard to give a quick overview of all the events.
 *
 * @todo TODO: The CardFooter currently displays a static number of applications.
 *             This should be replaced with the actual number of applications.
 */
export async function EventThumbnailCard({
  className,
  event,
  ...props
}: React.ComponentProps<typeof Card> & {
  /**
   * The event from which the thumbnail should be generated.
   */
  event: Event;
}) {
  const formattedDate = format(event.createdAt, 'dd.MM.yyyy');
  const eventPath = `/admin/event/${event.id}`;

  return (
    <Card
      data-slot={'event-thumbnail-card'}
      className={cn('h-fit', className)}
      {...props}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-start">
          <div className="border-border relative rounded-sm border p-2">
            <CalendarIcon className="text-foreground size-5" />

            {/* When the Event is active (published) display a Pinger */}
            {event.status === 'PUBLISHED' && (
              <Pinger
                variant={'success'}
                size={'md'}
                className="absolute -top-1.5 -right-1.5"
              />
            )}
          </div>
          {event.status === 'PUBLISHED' && (
            <Badge className="ml-auto" variant={'green'}>
              Veröffentlicht
            </Badge>
          )}
          {event.status === 'ARCHIVED' && (
            <Badge className="ml-auto" variant={'yellow'}>
              Archiviert
            </Badge>
          )}
          {event.status === 'DRAFT' && (
            <Badge className="ml-auto">Entwurf</Badge>
          )}
        </div>

        <CardLink href={eventPath} className="mt-6">
          <CardTitle>{event.name}</CardTitle>
        </CardLink>

        {/* Description */}
        <CardDescription>Erstellt am {formattedDate}</CardDescription>
      </CardContent>
      <CardFooter>
        <small className="text-xs">352 Bewerbungen</small>
      </CardFooter>
    </Card>
  );
}
