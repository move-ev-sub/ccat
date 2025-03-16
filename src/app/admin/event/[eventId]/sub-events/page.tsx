import { SubEvent } from '@prisma/client';
import { NoSubEvents } from './_components/no-sub-events';
import { SubEventsList } from './_components/sub-events-list';

// Mock data for demonstration, replace with actual data fetching
const mockSubEvents: SubEvent[] = [
  {
    createdAt: new Date(),
    id: '1',
    createdById: '',
    description:
      'Ein Workshop für alle, die sich für die Zukunft der Arbeit interessieren.',
    name: 'Workshop mit viadee',
    startDate: new Date('2025-12-13T13:00:00'),
    endDate: new Date('2025-12-13T14:00:00'),
    maxParticipants: 25,
    eventId: '',
  },
  {
    createdAt: new Date(),
    id: '2',
    createdById: '',

    name: 'Interview mit viadee',
    startDate: new Date('2025-12-13T15:00:00'),
    endDate: new Date('2025-12-13T16:00:00'),
    maxParticipants: 10,
    eventId: '',
    description:
      'Ein Interview mit viadee zu den Herausforderungen der Digitalisierung.',
  },
  {
    createdAt: new Date(),
    id: '3',
    createdById: '',
    name: 'Podiumsdiskussion',
    startDate: new Date('2025-12-14T13:00:00'),
    endDate: new Date('2025-12-14T14:00:00'),
    maxParticipants: 45,
    eventId: '',
    description:
      'Eine Podiumsdiskussion mit Experten aus der Wirtschaft und Wissenschaft.',
  },
  {
    createdAt: new Date(),
    id: '4',
    createdById: '',
    name: 'Social mit Roland Berger',
    startDate: new Date('2025-12-16T15:00:00'),
    endDate: new Date('2025-12-17T16:00:00'),
    maxParticipants: 32,
    eventId: '',
    description:
      'Ein Social mit Roland Berger, um sich über die neuesten Entwicklungen auszutauschen.',
  },
  // Add more mock events as needed
];

export default async function AdminEventSubeventsPage() {
  const subEvents = mockSubEvents;
  if (subEvents.length === 0) {
    return <NoSubEvents />;
  }

  return <SubEventsList subEvents={subEvents} />;
}
