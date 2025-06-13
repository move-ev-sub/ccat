import { getSlotsForEvent } from '@/features/slot/services/slotService';
import { getSubEventsForEvent } from '@/features/sub-event/services/subEventService';
import { SubEvent } from '@/generated/prisma/client';
import { SlotEntry } from '../stores/application.store';

export async function prepareApplicationForm(
  eventId: string
): Promise<{ slots: SlotEntry[]; subEvents: SubEvent[] } | null> {
  // Fetch slots
  const slotsRes = await getSlotsForEvent({ eventId });

  if (!slotsRes.ok) {
    throw new Error('Failed to fetch slots');
  }

  const slotEntries: SlotEntry[] = slotsRes.data.map((slot) => ({
    id: slot.id,
    startDate: slot.startDate,
    endDate: slot.endDate,
    prioritizedSelection: null,
    selections: [],
  }));

  // fetch sub events
  const subEventsRes = await getSubEventsForEvent({ eventId });

  if (!subEventsRes.ok) {
    throw new Error('Failed to fetch sub events');
  }

  const subEvents = subEventsRes.data;

  return { slots: slotEntries, subEvents };
}
