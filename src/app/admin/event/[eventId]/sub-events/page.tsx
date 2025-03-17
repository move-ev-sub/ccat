import { getSubEventsForEvent } from '@/server/services/sub-event';
import { SubEventsList } from './_components/sub-events-list';

export default async function AdminEventSubeventsPage({
  params: paramsPromise,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await paramsPromise;

  const res = await getSubEventsForEvent({ eventId });

  // TODO: Handle error
  if (!res.ok) {
    throw new Error(res.error);
  }

  const subEvents = res.data;

  return <SubEventsList subEvents={subEvents} />;
}
