import * as eventService from '@/server/services/event';
import { ActionResponse } from '../types/action-response';
import { EventSelectResult } from '../types/event';

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
