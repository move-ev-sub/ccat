import * as eventService from '@/server/services/event';
import { NewEventData, newEventSchema } from '../schemas/event';
import { ActionResponse } from '../types/action-response';
import { EventInsertData, EventSelectResult } from '../types/event';

export async function getAllEvents(): Promise<
  ActionResponse<EventSelectResult[]>
> {
  const res = await eventService.getAllEvents();

  if (res.error || !res.data) {
    return {
      status: 'error',
      error: res.error || 'Ein unbekannter Fehler ist aufgetreten.',
      data: [],
    };
  }

  return {
    status: 'success',
    data: res.data,
  };
}

export async function createEvent(
  data: NewEventData
): Promise<ActionResponse<EventInsertData>> {
  const parseResult = await newEventSchema.safeParseAsync(data);

  if (!parseResult.success) {
    return {
      status: 'error',
      error: 'Invalid data',
    };
  }

  const res = await eventService.createEvent(data);

  if (res.error || !res.data) {
    return {
      status: 'error',
      error: res.error || 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }

  return {
    status: 'success',
    // createEvent service returns an array of the created event
    data: res.data[0],
  };
}
