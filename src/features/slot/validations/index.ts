import { cuidSchema } from '@/lib/validations/cuid';
import { z } from 'zod';

export const createSlotSchema = z.object({
  eventId: cuidSchema,
  startDate: z.date(),
  endDate: z.date(),
});

export const getSlotsForEventSchema = z.object({
  eventId: cuidSchema,
});
