import { getEvent } from '@/server/actions/event';
import { notFound } from 'next/navigation';

export default async function AdminEventOverviewPage({
  params,
}: {
  params: Promise<{
    eventId: string;
  }>;
}) {
  const eventId = (await params).eventId;

  const res = await getEvent(eventId);

  if (res.error || !res.data) {
    notFound();
  }

  return (
    <div className="py-20">
      <div className="container">
        <h1>{res.data.name}</h1>
        <p>{res.data.description}</p>
      </div>
    </div>
  );
}
