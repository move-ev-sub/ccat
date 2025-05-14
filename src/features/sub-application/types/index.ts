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
