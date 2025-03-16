import { useParams } from 'next/navigation';

/**
 * The useEventId hook provides the eventId of the current event.
 * If the eventId is not available, it will return undefined.
 *
 * The hook gets the event id from the URL and returns it. It relies
 * on the useParams hook from the next/navigation package.
 *
 */
export function useEventId(): string | undefined {
  const { eventId } = useParams<{ eventId: string }>();

  return eventId;
}
