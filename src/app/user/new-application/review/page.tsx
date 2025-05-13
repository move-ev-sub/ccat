'use client';

import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListRow,
  DescriptionListTerm,
} from '@/components/ui/description-list';
import { Separator } from '@/components/ui/separator';

import { useApplicationStore } from '@/features/application/stores/application.store';
import { SelectionsReviewGroup } from '@/features/application/ui/selections-review-group';
import { UploadedFileCard } from '@/features/application/ui/uploaded-file';
import { cn } from '@/lib/utils/cn';
import { translateDegree, translateGender } from '@/lib/utils/translations';
import { format } from 'date-fns';
import React from 'react';

export default function ReviewPage() {
  const { general, slots } = useApplicationStore((state) => state);

  return (
    <section id="review">
      <PageHeader className="px-0">
        <PageTitle>Überprüfe deine Eingaben</PageTitle>
        <PageDesc>
          Hier kannst du deine Eingaben überprüfen und ggf. ändern.
        </PageDesc>
      </PageHeader>

      <ReviewSection
        id="general-information"
        title="Allgemeine Informationen"
        className="mt-to-header"
      >
        <DescriptionList className="px-0">
          <DescriptionListRow>
            <DescriptionListDescription>
              Vor- und Nachname
            </DescriptionListDescription>
            <DescriptionListTerm>
              {general.firstName} {general.lastName}
            </DescriptionListTerm>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListDescription>Geschlecht</DescriptionListDescription>
            <DescriptionListTerm>
              {translateGender(general.gender)}
            </DescriptionListTerm>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListDescription>
              Geburtsdatum
            </DescriptionListDescription>
            <DescriptionListTerm>
              {format(general.birthDate, 'dd.MM.yyyy')}
            </DescriptionListTerm>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListDescription>Abiturnote</DescriptionListDescription>
            <DescriptionListTerm>{general.abiturGrade}</DescriptionListTerm>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListDescription>
              Derzeitiger Abschluss
            </DescriptionListDescription>
            <DescriptionListTerm>
              {translateDegree(general.currentDegree)}
            </DescriptionListTerm>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListDescription>Universität</DescriptionListDescription>
            <DescriptionListTerm>{general.university}</DescriptionListTerm>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListDescription>Studiengang</DescriptionListDescription>
            <DescriptionListTerm>{general.fieldOfStudy}</DescriptionListTerm>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListDescription>Semester</DescriptionListDescription>
            <DescriptionListTerm>
              {general.semester}. ({translateDegree(general.targetDegree)})
            </DescriptionListTerm>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListDescription>
              Derzeitiger Notenschnitt
            </DescriptionListDescription>
            <DescriptionListTerm>{general.currentGpa}</DescriptionListTerm>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListDescription>
              Vorraussichtliche Abschlussjahr
            </DescriptionListDescription>
            <DescriptionListTerm>
              {general.expectedGraduationYear}
            </DescriptionListTerm>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListDescription>
              Erfahrung im Ausland
            </DescriptionListDescription>
            <DescriptionListTerm>
              {general.experienceAbroad} Monat
              {general.experienceAbroad != 1 && 'e'}
            </DescriptionListTerm>
          </DescriptionListRow>

          <DescriptionListRow>
            <DescriptionListDescription>
              Erfahrung im in der Unternehmensberatung
            </DescriptionListDescription>
            <DescriptionListTerm>
              {general.experienceConsulting} Monat
              {general.experienceConsulting != 1 && 'e'}
            </DescriptionListTerm>
          </DescriptionListRow>
        </DescriptionList>
      </ReviewSection>

      <Separator className="my-12" />

      <ReviewSection id="documents" title="Dokumente">
        {general.cv?.length > 0 ? (
          <UploadedFileCard file={general.cv[0]} />
        ) : (
          <p className="text-muted-foreground">Kein Lebenslauf hochgeladen</p>
        )}
      </ReviewSection>

      <Separator className="my-12" />

      <ReviewSection
        id="events"
        title="Ausgewählte Veranstaltungen"
        wrapperClassName="space-y-20"
      >
        {Object.values(slots)
          .filter((slot) => slot.selections.length > 0)
          .map((slot) => (
            <SelectionsReviewGroup key={slot.id} slotEntry={slot} />
          ))}
      </ReviewSection>
    </section>
  );
}

// #region ReviewSection
// =======================================================
function ReviewSection({
  title,
  children,
  wrapperClassName,
  ...props
}: Omit<React.ComponentProps<'section'>, 'id'> & {
  id: string;
  title: string;
  wrapperClassName?: string;
}) {
  const id = React.useId();

  return (
    <section role="region" aria-labelledby={id} {...props}>
      <h3 id={id} className="text-foreground text-lg font-medium">
        {title}
      </h3>
      <div className={cn('mt-6', wrapperClassName)}>{children}</div>
    </section>
  );
}
