import { PageContainer } from '@/components/page-container';
import { PageDesc, PageTitle } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { getSlotsForEvent } from '@/features/slot/services/slotService';
import { CreateSlotDialog } from '@/features/slot/ui/create-slot-dialog';
import { SlotChip } from '@/features/slot/ui/slot-chip';
import { format } from 'date-fns';
import { Fragment } from 'react';

export default async function EventSlotsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const res = await getSlotsForEvent({ eventId });

  if (!res.ok) {
    throw new Error(res.error);
  }

  const slots = res.data;

  // Group slots by date
  const slotsByDate = slots.reduce(
    (acc, slot) => {
      const date = new Date(slot.startDate);
      const dateString = format(date, 'dd.MM.yyyy');

      if (!acc[dateString]) {
        acc[dateString] = [];
      }

      acc[dateString].push(slot);
      return acc;
    },
    {} as Record<string, typeof slots>
  );

  return (
    <>
      <PageContainer>
        <header className="border-border flex flex-wrap items-center justify-between gap-6 border-b px-8 pb-12">
          <div>
            <PageTitle>Slots</PageTitle>
            <PageDesc>
              Hier kannst du die Slots für die Veranstaltung erstellen.
            </PageDesc>
          </div>
          <CreateSlotDialog eventId={eventId} />
        </header>
      </PageContainer>
      <section className="mt-to-header space-y-20 px-8">
        {Object.entries(slotsByDate).map(([date, slots]) => (
          <Fragment key={date.toString()}>
            <div className="grid grid-cols-4 gap-8">
              <div>
                <p className="text-foreground font-medium">{date}</p>
              </div>
              <div className="col-span-3 flex flex-wrap items-center justify-start gap-6">
                {slots.map((slot) => (
                  <SlotChip key={slot.id} value={slot} />
                ))}
              </div>
            </div>
            <Separator className="last:hidden" />
          </Fragment>
        ))}
      </section>
    </>
  );
}
