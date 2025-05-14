import { z } from 'zod';
import {
  canCreateSubEventSchema,
  createSubEventSchema,
  getPublishedSubEventsForCompanySchema,
  getSubEventsForCompanySchema,
  getSubEventsForEventSchema,
} from '../validations';

export type CreateSubEventArgs = z.infer<typeof createSubEventSchema>;

export type GetSubEventsForEventArgs = z.infer<
  typeof getSubEventsForEventSchema
>;

export type GetSubEventsForCompanyArgs = z.infer<
  typeof getSubEventsForCompanySchema
>;

export type GetPublishedSubEventsForCompanyArgs = z.infer<
  typeof getPublishedSubEventsForCompanySchema
>;

export type CanCreateSubEventArgs = z.infer<typeof canCreateSubEventSchema>;
