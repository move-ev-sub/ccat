import { ApplicationStatus } from '@/generated/prisma/client';

export function translateApplicationStatus(status: ApplicationStatus) {
  switch (status) {
    case ApplicationStatus.DRAFT:
      return 'Entwurf';
    case ApplicationStatus.SUBMITTED:
      return 'Abgesendet';
    case ApplicationStatus.CLOSED:
      return 'Geschlossen';
  }
}
