import {
  canCreateSubEvent,
  getSubEventsForEvent,
} from '@/features/sub-event/services/subEventService';
import { Metadata } from 'next';
import { SubEventsList } from './_components/sub-events-list';

export const metadata: Metadata = {
  title: 'Unterveranstaltungen',
  description: 'Unterveranstaltungen für diese Veranstaltung.',
};

export default async function AdminEventSubeventsPage({
  params: paramsPromise,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await paramsPromise;

  const canCreateSubEventRes = await canCreateSubEvent({ eventId });

  if (!canCreateSubEventRes.ok) {
    throw new Error(canCreateSubEventRes.error);
  }

  const res = await getSubEventsForEvent({ eventId });

  // TODO: Handle error
  if (!res.ok) {
    throw new Error(res.error);
  }

  const subEvents = res.data;

  return <SubEventsList subEvents={subEvents} />;
}
