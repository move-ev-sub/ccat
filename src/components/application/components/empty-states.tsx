import { cn } from '@/utils';
import React from 'react';

/**
 * Renders an empty state when no events are found in the {@link SubEventsList} while
 * searching for a specific event.
 */
export function NoEventsFound({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      role="alert"
      aria-live="polite"
      aria-label="Keine Veranstaltungen gefunden"
      className={cn(
        'flex flex-col items-center justify-center py-20',
        className
      )}
      {...props}
    >
      <p className="text-muted-foreground text-sm">
        Zu diesem Suchbegriff konnten keine Veranstaltungen gefunden werden.
      </p>
    </div>
  );
}
