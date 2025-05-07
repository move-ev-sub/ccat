'use client';

import { CoverLettersForm } from '@/components/application/forms/cover-letters-form';
import { useApplicationStore } from '@/components/application/stores/application.store';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';

export default function NewApplicationCoverLettersPage() {
  const { slots } = useApplicationStore((state) => state);

  // flatten the selections from all slots
  const selections = Object.values(slots).flatMap((slot) => slot.selections);

  return (
    <section>
      <PageHeader className="px-0">
        <PageTitle>Anschreiben anfügen</PageTitle>
        <PageDesc>
          Bitte füge dein Anschreiben an, um deine Informationen zu speichern.
        </PageDesc>
      </PageHeader>
      <div className="mt-to-header">
        <CoverLettersForm selections={selections} />
      </div>
    </section>
  );
}
