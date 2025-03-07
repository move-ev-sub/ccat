import { cn } from '@/utils';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/16/solid';
import { SubEvent } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react';
import { Card, CardContent, CardHeader, CardLink } from './ui/card';

/**
 * A Component that displays a preview of a sub-event and links to the
 * sub-event detail page.
 *
 * In addition to the basic information such as type and title, a description
 * list with information on the start, end and maximum number of participants
 * is also rendered. If the start and end date are on the same day, two lines
 * “Date” and “Time” (start time to end time) are displayed. If the start and
 * end dates are not on the same day, two different lines “start” and “end” are
 * rendered, each showing both the date and the time. This helps to simplify
 * readability for users.
 *
 * @todo TODO: The Card Icon should be replaced with the actual sub-event type icon.
 *             Currently, the ChatBubbleLeftRightIcon is used as a placeholder.
 */
export async function SubEventThumbnailCard({
  className,
  subEvent,
  ...props
}: React.ComponentProps<typeof Card> & {
  /**
   * The sub event from which the thumbnail should be generated.
   */
  subEvent: SubEvent;
}) {
  /**
   * Checks if two dates are on the same calendar day.
   *
   * @param date1 - The first date to compare
   * @param date2 - The second date to compare
   * @returns True if both dates are on the same day, false otherwise
   */
  const areDatesSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const sameDay: boolean = areDatesSameDay(
    subEvent.startDate,
    subEvent.endDate
  );

  // When both events are on the same day, only display the date, since
  // in this case the time difference will be displayed in a separate description
  // list item. If they are not in the same day, each date receives a time and
  // is displayed in a separate line.
  const formattedStart = format(
    subEvent.startDate,
    sameDay ? 'dd.MM.yyyy' : 'dd.MM.yyyy, HH:mm'
  );

  // For the sake of simplicity, the end date is always formatted, regardless of
  // whether it is displayed or not.
  const formattedEnd = format(
    subEvent.endDate,
    sameDay ? 'dd.MM.yyyy' : 'dd.MM.yyyy, HH:mm'
  );

  // Format the time between the start and end date
  const timeBetween = `${format(subEvent.startDate, 'HH:mm')} - ${format(subEvent.endDate, 'HH:mm')}`;

  const subEventPath = `/admin/event/${subEvent.eventId}/sub-events/${subEvent.id}`;

  return (
    <Card className={cn('h-fit', className)} {...props}>
      <CardHeader>
        {/* @TODO */}
        <div className="border-border bg-background text-accent w-fit rounded-md border p-2">
          <ChatBubbleLeftRightIcon className="size-5" />
        </div>
        <CardLink href={subEventPath} className="mt-4">
          {subEvent.name}
        </CardLink>
      </CardHeader>
      <CardContent>
        <dl>
          {sameDay ? (
            <>
              <SubEventThumbnailCardListItem label="Datum" value="11.12.2025" />
              <SubEventThumbnailCardListItem
                label="Uhrzeit"
                value={timeBetween}
              />
            </>
          ) : (
            <>
              <SubEventThumbnailCardListItem
                label="Start"
                value={formattedStart}
              />
              <SubEventThumbnailCardListItem
                label="Ende"
                value={formattedEnd}
              />
            </>
          )}
          <SubEventThumbnailCardListItem
            label="Max. Teilnehmer"
            value={subEvent.maxParticipants.toString()}
          />
        </dl>
      </CardContent>
    </Card>
  );
}

/**
 * The SubEventThumbnailCardListItem serves as a small helper component to
 * keep the styles in sync for the desc items in the SubEventThumbnailCard.
 *
 * @todo TODO: The values should be replaced with the actual values from the
 * sub-event but this is done in the SubEventThumbnailCard component.
 */
function SubEventThumbnailCardListItem({
  className,
  label,
  value,
  ...props
}: React.ComponentProps<'div'> & {
  label: string;
  value: string;
}) {
  return (
    <>
      <div
        data-slot={'sub-event-thumbnail-card-list-item'}
        className={cn(
          'border-border flex justify-between border-b py-2 text-sm first:pt-0 last:border-none last:pb-0',
          className
        )}
        {...props}
      >
        <dt className="text-secondary">{label}</dt>
        <dd className="text-foreground font-medium">{value}</dd>
      </div>
    </>
  );
}
