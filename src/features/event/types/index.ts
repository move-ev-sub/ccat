import { Event, Phase } from '@/generated/prisma/client';
import { z } from 'zod';
import {
  getEventByIdSchema,
  getPublishedEventByIdSchema,
} from '../validations';

export type GetEventByIdArgs = z.infer<typeof getEventByIdSchema>;

export type GetPublishedEventByIdArgs = z.infer<
  typeof getPublishedEventByIdSchema
>;

export interface EventWithPhases extends Event {
  phases: Phase[];
}
