import { z } from 'zod';
import {
  createPhaseSchema,
  existsPhaseSchema,
  fetchPhasesForEventSchema,
  getCurrentPhaseSchema,
  isPhasesSetupCompletedSchema,
  updatePhaseSchema,
} from '../validations';

export type UpdatePhaseArgs = z.infer<typeof updatePhaseSchema>;

export type CreatePhaseArgs = z.infer<typeof createPhaseSchema>;

export type ExistsPhaseArgs = z.infer<typeof existsPhaseSchema>;

export type FetchPhasesForEventArgs = z.infer<typeof fetchPhasesForEventSchema>;

export type IsPhasesSetupCompletedArgs = z.infer<
  typeof isPhasesSetupCompletedSchema
>;

export type GetCurrentPhaseArgs = z.infer<typeof getCurrentPhaseSchema>;
