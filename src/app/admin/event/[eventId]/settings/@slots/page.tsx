import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSlotsForEvent } from '@/features/slot/services/slotService';
import { Slot } from '@/generated/prisma/client';
import {
  ArrowUpRightIcon,
  InformationCircleIcon,
} from '@heroicons/react/16/solid';
import { format } from 'date-fns';
import { Metadata } from 'next';
import Link from 'next/link';
import { AddSlotButton } from './_components/add-slot';
import { SlotItem } from './_components/slot-item';

export const metadata: Metadata = {
  title: 'Slots',
  description: 'Hier können die Slots der Veranstaltung bearbeitet werden.',
};

export default async function AdminEventSlotsSettingsPage({
  params,
}: {
  params: Promise<{
    eventId: string;
  }>;
}) {
  const eventId = (await params).eventId;
  const res = await getSlotsForEvent({ eventId });

  // TODO: handle case where eventId is null
  if (!res.ok) {
    return (
      <p>
        Error:
        {res.error}
      </p>
    );
  }

  const slots = res.data;

  console.log('SLOTS: ', slots);

  // TODO: Definitly not a good way to group and sort slots.
  // THIS NEEDS TO BE IMPROVED
  const groupedAndSorted = slots
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime()) // Nach Datum sortieren
    .reduce(
      (acc, item) => {
        const dateKey = item.startDate.toISOString().split('T')[0]; // Datum als String-Format
        acc[dateKey] = acc[dateKey] || [];
        acc[dateKey].push(item);
        return acc;
      },
      {} as Record<string, Slot[]>
    );

  console.log(groupedAndSorted);

  return (
    <>
      <div>
        <h4 className="text-lg font-medium">Slots</h4>
        <p className="text-secondary mt-2 max-w-prose text-sm">
          Veranstaltungen finden immer innerhalb von Slots statt. Wenn innerhalb
          eines Slots mehrere Veranstaltungen stattfinden, müssen die Teilnehmer
          sich für eine entscheiden und diese priorisieren.
        </p>
        <Link
          href={'#'}
          className="text-accent mt-4 flex w-fit items-center justify-center gap-1.5 text-sm font-medium"
        >
          Dokumentation <ArrowUpRightIcon className="size-4" />
        </Link>
      </div>
      <div className="mt-10 space-y-8">
        {Object.entries(groupedAndSorted).map(([date, slots]) => (
          <Card key={date}>
            <CardHeader>
              <CardTitle>{format(date, 'dd.MM.yy')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-start gap-4">
              {slots.map((slot) => (
                <SlotItem key={slot.id} slot={slot} />
              ))}
              <AddSlotButton />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex items-start justify-start gap-2.5">
        <InformationCircleIcon className="text-secondary mt-0.5 size-4 shrink-0" />
        <p className="text-secondary max-w-prose text-sm">
          Fehlt eine Datum? Slots kannst du nur für Tage festlegen, an denen die
          Veranstaltung stattfindet. Wenn ein Datum fehlt, kannst du die
          Veranstaltung{' '}
          <Link
            href={'#'}
            className="text-foreground hover:text-accent font-medium"
          >
            hier
          </Link>{' '}
          verlängern.
        </p>
      </div>
    </>
  );
}
