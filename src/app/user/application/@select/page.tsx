import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { NavigationBar } from '../../../../components/application/application-navigation';
import { SubEventSelectCard } from '../../../../components/application/sub-event-select-card';

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
          <SubEventSelectCard
            subEvent={{
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
            }}
          />
          <SubEventSelectCard
            subEvent={{
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
              coverLetterRequirement: 'OPTIONAL',
              hostId: '1',
              profileId: '1',
              slotId: '1',
            }}
          />
        </div>
      </div>
      <NavigationBar currentPageValid={true} className="mt-12" />
    </>
  );
}
