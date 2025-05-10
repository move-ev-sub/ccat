import { ApplicationsDataTable } from '@/components/data-table/tables/applications/applications-data-table';
import { columns } from '@/components/data-table/tables/applications/columns';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FullSubApplication } from '@/server/types/sub-application';
import { faker } from '@faker-js/faker';
import { ArrowDownTrayIcon, ArrowUpIcon } from '@heroicons/react/16/solid';
import {
  Degree,
  Gender,
  SubApplicationPrioritzation,
  SubApplicationStatus,
} from '@prisma/client';

export default async function ListPage() {
  const data: FullSubApplication[] = [1, ...Array(100)].map(() => ({
    applicationId: faker.string.uuid(),
    coverLetter: 'sdf',
    id: faker.string.uuid(),
    prioritized: false,
    priorization: faker.helpers.arrayElement<SubApplicationPrioritzation>([
      'PRIO_1',
      'PRIO_2',
      'PRIO_3',
      'PRIO_4',
      'PRIO_5',
      'UNSET',
    ]),
    status: faker.helpers.arrayElement<SubApplicationStatus>([
      SubApplicationStatus.ACCEPTED,
      SubApplicationStatus.REJECTED,
      SubApplicationStatus.PENDING,
    ]),
    subEventId: faker.string.uuid(),
    application: {
      abiturGrade: faker.number.float({ min: 1, max: 6, fractionDigits: 1 }),
      birthDate: faker.date.birthdate({ min: 18, max: 25, mode: 'age' }),
      currentDegree: faker.helpers.arrayElement<Degree>([
        'ABITUR',
        'BACHELOR',
        'HOCHSCHULREIFE',
      ]),
      currentGpa: faker.number.float({ min: 1, max: 4, fractionDigits: 1 }),
      eventId: faker.string.uuid(),
      firstName: faker.person.firstName(),
      gender: faker.helpers.arrayElement<Gender>([
        'MALE',
        'FEMALE',
        'DIVERSE',
        'PREFFER_NOT_TO_SAY',
      ]),
      id: faker.string.uuid(),
      lastName: faker.person.lastName(),
      universityId: faker.string.uuid(),
      userId: faker.string.uuid(),
      status: 'SUBMITTED',
      cvUrl: 'https://example.com/cv.pdf',
      expectedGraduationYear: faker.date.future({ years: 4 }),
      fieldOfStudy: faker.person.jobTitle(),
      semester: faker.number.int({ min: 1, max: 10 }),
      targetDegree: faker.helpers.arrayElement<Degree>(['BACHELOR', 'MASTER']),
      experienceAbroad: faker.number.int({ min: 0, max: 10 }),
      experienceConsulting: faker.number.int({ min: 0, max: 10 }),
      experienceInternships: faker.number.int({ min: 0, max: 10 }),
    },
  }));

  return (
    <div className="max-w-full py-12">
      <div className="border-border-secondary flex items-center justify-between border-b px-8 pb-12">
        <div>
          <h1 className="text-foreground text-lg font-medium">Bewerbungen</h1>
          <p className="text-secondary mt-2 max-w-prose text-sm">
            Hier ist eine Liste aller Bewerbungen für die ausgewählte
            Veranstaltung.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={'input'}
                className="!bg-background !cursor-default !opacity-70"
                tabIndex={-1}
              >
                <ArrowUpIcon className="size-4" />
                Auswahl importieren
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Diese Funktion ist derzeit nicht verfügbar.
            </TooltipContent>
          </Tooltip>
          <Button variant={'input'}>
            <ArrowDownTrayIcon className="size-4" />
            Exportieren
            <span className="border-border-secondary bg-background-muted block rounded-md border px-1.5 py-0.5 text-xs">
              ⌘⇧E
            </span>
          </Button>
        </div>
      </div>
      <div className="maxwfull">
        <ApplicationsDataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
