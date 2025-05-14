import { z } from 'zod';
import {
  countSlotsForEventSchema,
  createSlotSchema,
  getSlotsForEventSchema,
} from '../validations';

export type CreateSlotArgs = z.infer<typeof createSlotSchema>;

export type GetSlotsForEventArgs = z.infer<typeof getSlotsForEventSchema>;

export type CountSlotsForEventArgs = z.infer<typeof countSlotsForEventSchema>;
