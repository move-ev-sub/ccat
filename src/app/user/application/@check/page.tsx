'use client';

import { NavigationBar } from '@/components/application/application-navigation';
import { useApplicationStore } from '@/components/application/application.store';
import {
  translateDegree,
  translateGender,
} from '@/components/application/utils';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListRow,
  DescriptionListTerm,
} from '@/components/ui/description-list';
import { format } from 'date-fns';

export default function ApplicationCheckPage() {
  const { general } = useApplicationStore((store) => store);
  const {
    firstName,
    lastName,
    birthDate,
    gender,
    university,
    currentDegree,
    targetDegree,
    semester,
    abiturGrade,
    currentGpa,
    expectedGraduationYear,
    experienceAbroad,
    experienceConsulting,
    fieldOfStudy,
  } = general;

  return (
    <>
      <PageHeader className="mb-20 px-0">
        <PageTitle>Angaben überprüfen</PageTitle>
        <PageDesc>
          Bitte überprüfe deine Angaben und stelle sicher, dass alles korrekt
          ist. Wenn alle Angaben stimmen, kannst du die Bewerbung abschicken.
        </PageDesc>
      </PageHeader>

      <div className="mt-to-header">
        <DescriptionList>
          <DescriptionListRow>
            <DescriptionListTerm>Vorname</DescriptionListTerm>
            <DescriptionListDescription>{firstName}</DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>Nachname</DescriptionListTerm>
            <DescriptionListDescription>{lastName}</DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>Geschlecht</DescriptionListTerm>
            <DescriptionListDescription>
              {translateGender(gender)}
            </DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>Geburtsdatum</DescriptionListTerm>
            <DescriptionListDescription>
              {format(birthDate, 'dd. MMMM yyyy')}
            </DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>Universität</DescriptionListTerm>
            <DescriptionListDescription>
              {university}
            </DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>Aktueller Abschluss</DescriptionListTerm>
            <DescriptionListDescription>
              {translateDegree(currentDegree)}
            </DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>Angestrebter Abschluss</DescriptionListTerm>
            <DescriptionListDescription>
              {translateDegree(targetDegree)}
            </DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>Erwartetes Abschlussjahr</DescriptionListTerm>
            <DescriptionListDescription>
              {expectedGraduationYear}
            </DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>Studiengang</DescriptionListTerm>
            <DescriptionListDescription>
              {fieldOfStudy}
            </DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>Aktuelles Semester</DescriptionListTerm>
            <DescriptionListDescription>{semester}</DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>
              Aktueller Notendurchschnitt
            </DescriptionListTerm>
            <DescriptionListDescription>
              {currentGpa}
            </DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>Abitur Note</DescriptionListTerm>
            <DescriptionListDescription>
              {abiturGrade}
            </DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>Erfahrung im Ausland</DescriptionListTerm>
            <DescriptionListDescription>
              {experienceAbroad} {experienceAbroad === 1 ? 'Monat' : 'Monate'}
            </DescriptionListDescription>
          </DescriptionListRow>
          <DescriptionListRow>
            <DescriptionListTerm>
              Erfahrung in der Unternehmensberatung
            </DescriptionListTerm>
            <DescriptionListDescription>
              {experienceConsulting}{' '}
              {experienceConsulting === 1 ? 'Monat' : 'Monate'}
            </DescriptionListDescription>
          </DescriptionListRow>
        </DescriptionList>
      </div>
      <NavigationBar currentPageValid={true} className="mt-12" />
    </>
  );
}
