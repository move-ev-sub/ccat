import { z } from 'zod';
import { createSlotSchema, getSlotsForEventSchema } from '../validations';

export type CreateSlotArgs = z.infer<typeof createSlotSchema>;

export type GetSlotsForEventArgs = z.infer<typeof getSlotsForEventSchema>;
