import { Application, Event } from '@/generated/prisma/client';

export interface ApplicationPreview
  extends Pick<Application, 'updatedAt' | 'status' | 'id'> {
  event: Pick<Event, 'name'>;
}
