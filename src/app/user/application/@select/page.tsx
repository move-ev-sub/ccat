'use client';

import { SubEventSelectCard } from '@/components/application/sub-event-select-card';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { SubEvent } from '@prisma/client';
import { SelectNavigationBar } from './_components/select-navgation-bar';

const subEvents: SubEvent[] = [
  {
    companyProfileId: '1',
    createdAt: new Date(),
    createdById: '1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    eventId: '1',
    id: '1',
    maxParticipants: 10,
    name: 'Interview mit viadee',
    startDate: new Date(),
    endDate: new Date(),
    coverLetterRequirement: 'NOT_REQUIRED',
    hostId: '1',
    profileId: '1',
    slotId: '1',
  },
  {
    companyProfileId: '2',
    createdAt: new Date(),
    createdById: '2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    eventId: '2',
    id: '2',
    maxParticipants: 10,
    name: 'Interview mit Roland Berger',
    startDate: new Date(),
    endDate: new Date(),
    coverLetterRequirement: 'REQUIRED',
    hostId: '2',
    profileId: '2',
    slotId: '2',
  },
  {
    companyProfileId: '3',
    createdAt: new Date(),
    createdById: '3',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    eventId: '3',
    id: '3',
    maxParticipants: 10,
    name: 'Interview mit McKinsey',
    startDate: new Date(),
    endDate: new Date(),
    hostId: '1',
    slotId: '1',
    coverLetterRequirement: 'NOT_REQUIRED',
    profileId: '1',
  },
  {
    companyProfileId: '4',
    createdAt: new Date(),
    createdById: '4',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    eventId: '4',
    id: '4',
    maxParticipants: 10,
    name: 'Interview mit BCG',
    startDate: new Date(),
    endDate: new Date(),
    coverLetterRequirement: 'REQUIRED',
    hostId: '4',
    profileId: '4',
    slotId: '2',
  },
];

export default function ApplicationSelectPage() {
  return (
    <>
      <PageHeader className="mb-20 px-0">
        <PageTitle>Veranstaltungen auswählen</PageTitle>
        <PageDesc>
          Hier kannst du entscheiden, auf welche Veranstaltungen du dich
          bewerben möchtest. Wähle mindestens eine Veranstaltung aus. Du hast
          die Option, zu jeder Veranstaltung einen Cover Letter zu schreiben.
        </PageDesc>
      </PageHeader>

      <div className="mt-to-header grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <p className="text-foreground font-medium">Socials</p>
        </div>
        <div className="col-span-3 space-y-8">
          {subEvents.map((subEvent) => (
            <SubEventSelectCard key={subEvent.id} subEvent={subEvent} />
          ))}
        </div>
      </div>
      <SelectNavigationBar className="mt-12" />
    </>
  );
}
