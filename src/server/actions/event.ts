import * as eventService from '@/server/services/event';
import { Event } from '@prisma/client';
import { NewEventData, newEventSchema } from '../schemas/event';
import { ActionResponse } from '../types/action-response';

export async function getAllEvents(): Promise<ActionResponse<Event[]>> {
  const res = await eventService.getAllEvents();

  if (!res.ok) {
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
): Promise<ActionResponse<Event>> {
  const parseResult = await newEventSchema.safeParseAsync(data);

  if (!parseResult.success) {
    return {
      status: 'error',
      error: 'Invalid data',
    };
  }

  const res = await eventService.createEvent(data);

  if (!res.ok) {
    return {
      status: 'error',
      error: res.error || 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }

  return {
    status: 'success',
    // createEvent service returns an array of the created event
    data: res.data,
  };
}

export async function getEvent(
  eventId: string
): Promise<ActionResponse<Event>> {
  const res = await eventService.getEventById(eventId);

  if (!res.ok) {
    return {
      status: 'error',
      error: res.error || 'Ein unbekannter Fehler ist aufgetreten.',
    };
  }

  return {
    status: 'success',
    data: res.data,
  };
}
