import { getSubEventsForEvent } from '@/server/services/sub-event';
import { Metadata } from 'next';
import { SubEventsList } from './_components/sub-events-list';

export const metadata: Metadata = {
  title: 'Unterveranstaltungen',
  description: 'Unterveranstaltungen für diese Consulting Contact',
};

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
