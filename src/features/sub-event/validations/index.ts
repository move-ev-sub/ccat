import { cuidSchema } from '@/lib/validations/cuid';
import { z } from 'zod';

export const createSubEventSchema = z.object({
  name: z.string(),

  startDate: z.date(),

  endDate: z.date(),

  eventId: cuidSchema,

  maxParticipants: z.number().positive(),

  description: z.string().optional(),

  hostId: cuidSchema,

  slotId: cuidSchema,
});

export const getSubEventsForEventSchema = z.object({
  eventId: cuidSchema,
});

export const getSubEventsForCompanySchema = z.object({
  companyId: cuidSchema,
});

export const getPublishedSubEventsForCompanySchema = z.object({
  companyId: cuidSchema,
});
