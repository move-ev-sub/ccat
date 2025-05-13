import { z } from 'zod';
import {
  createSubEventSchema,
  getPublishedSubEventsForCompanySchema,
  getSubEventsForCompanySchema,
  getSubEventsForEventSchema,
} from '../validations';

import { Application, SubApplication } from '@/generated/prisma/client';

/**
 * A sub-application for a sub-event with the main application included
 */
export interface FullSubApplication extends SubApplication {
  /**
   * The main application that is associated with the sub-application
   */
  application: Application;
}

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
