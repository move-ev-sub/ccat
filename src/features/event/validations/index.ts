import { cuidSchema } from '@/lib/validations/cuid';
import { z } from 'zod';

export const getEventByIdSchema = cuidSchema;

export const getPublishedEventByIdSchema = z.object({
  eventId: cuidSchema,
});
