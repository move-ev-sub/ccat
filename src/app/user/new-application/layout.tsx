import { PageContainer } from '@/components/page-container';
import { Slot } from '@/generated/prisma/client';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

import { StepNavigation } from '@/features/application/components/step-navigation';
import {
  ApplicationStoreProvider,
  SlotEntry,
} from '@/features/application/stores/application.store';

async function getSlots(): Promise<Slot[]> {
  return [
    {
      id: '1',
      startDate: new Date('2025-05-07T10:00:00.000Z'),
      endDate: new Date('2025-05-07T11:00:00.000Z'),
      createdAt: new Date(),
      createdById: '1',
      eventId: '1',
    },
    {
      id: '2',
      startDate: new Date('2025-05-07T11:00:00.000Z'),
      endDate: new Date('2025-05-07T12:00:00.000Z'),
      createdAt: new Date(),
      createdById: '1',
      eventId: '1',
    },
    {
      id: '3',
      startDate: new Date('2025-05-07T12:00:00.000Z'),
      endDate: new Date('2025-05-07T13:00:00.000Z'),
      createdAt: new Date(),
      createdById: '1',
      eventId: '1',
    },
  ];
}

export default async function NewApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const slots = await getSlots();

  const slotEntries: SlotEntry[] = slots.map((slot) => ({
    id: slot.id,
    startDate: slot.startDate,
    endDate: slot.endDate,
    prioritizedSelection: null,
    selections: [],
  }));

  return (
    <ApplicationStoreProvider
      initialState={{
        slots: Object.fromEntries(
          slotEntries.map((entry) => [entry.id, entry])
        ),
      }}
    >
      <main className="hidden lg:block">
        <PageContainer className="container grid grid-cols-5 gap-8">
          <aside className="sticky top-10 h-fit sm:top-12">
            <StepNavigation />
          </aside>
          <div className="col-span-4">{children}</div>
        </PageContainer>
      </main>
      <div className="lg:hidden">
        <PageContainer className="container flex flex-col items-start">
          <ComputerDesktopIcon className="text-secondary size-6" />
          <p className="mt-8 text-lg font-medium">Nicht verfügbar auf Mobil</p>
          <p className="text-secondary mt-2 max-w-prose text-sm">
            Diese Seite ist nur auf Desktop-Geräten verfügbar. Bitte wechsle auf
            einen größeren Bildschirm.
          </p>
        </PageContainer>
      </div>
    </ApplicationStoreProvider>
  );
}
