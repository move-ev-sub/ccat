'use client';

import { PageDesc, PageTitle } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { useApplicationStore } from '@/features/application/stores/application.store';
import { ApplicationFormHeader } from '@/features/application/ui/application-form-header';
import { CoverLettersForm } from '@/features/application/ui/forms/cover-letters-form';

export default function NewApplicationCoverLettersPage() {
  const { slots } = useApplicationStore((state) => state);

  // flatten the selections from all slots
  const selections = Object.values(slots).flatMap((slot) => slot.selections);

  return (
    <>
      <ApplicationFormHeader>
        <PageTitle>Anschreiben anfügen</PageTitle>
        <PageDesc>
          Bitte füge dein Anschreiben an, um deine Informationen zu speichern.
        </PageDesc>
      </ApplicationFormHeader>
      <Separator className="my-12" />
      <div className="mx-auto w-full max-w-4xl px-8">
        <CoverLettersForm selections={selections} />
      </div>
    </>
  );
}
