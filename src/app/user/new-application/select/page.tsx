'use client';

import { SubEventsList } from '@/components/application/components/sub-events-list';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { SubEvent } from '@/generated/prisma/client';

const base: SubEvent = {
  coverLetterRequirement: 'OPTIONAL',
  createdAt: new Date(),
  createdById: '1',
  eventId: '1',
  hostId: '1',
  id: '1',
  maxParticipants: 10,
  name: 'Interview mit viadee',
  slotId: '1',
  startDate: new Date(),
  endDate: new Date(),
  description: 'Description',
};

const SUB_EVENTS: SubEvent[] = [
  {
    ...base,
    name: 'Interview mit viadee',
    id: '1',
    slotId: '1',
    coverLetterRequirement: 'REQUIRED',
  },
  {
    ...base,
    name: 'Interview mit Roland Berger',
    id: '2',
    slotId: '1',
    coverLetterRequirement: 'REQUIRED',
  },
  {
    ...base,
    name: 'Interview mit McKinsey',
    id: '3',
    slotId: '1',
  },
  {
    ...base,
    name: 'Social mit BCG',
    id: '4',
    slotId: '2',
  },
  {
    ...base,
    name: 'Social mit Bain',
    id: '5',
    slotId: '2',
  },
  {
    ...base,
    name: 'Galaabend mit McKinsey',
    id: '6',
    slotId: '3',
  },
  {
    ...base,
    name: 'Galaabend mit Bain',
    id: '7',
    slotId: '3',
  },
];

export default function NewApplicationSelectPage() {
  return (
    <section>
      <PageHeader className="px-0">
        <PageTitle>Eventauswahl</PageTitle>
        <PageDesc>
          Bitte wähle die Events aus, die du besuchen möchtest.
        </PageDesc>
      </PageHeader>
      <SubEventsList subEvents={SUB_EVENTS} className="mt-to-header" />
    </section>
  );
}
