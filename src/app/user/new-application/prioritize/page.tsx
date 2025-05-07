'use client';

import { PrioritizeForm } from '@/components/application/forms/prioritize-form';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';

export default function NewApplicationPrioritizePage() {
  return (
    <section>
      <PageHeader className="px-0">
        <PageTitle>Priorität</PageTitle>
        <PageDesc>
          Bitte fülle die folgenden Felder aus, um deine Informationen zu
          speichern.
        </PageDesc>
      </PageHeader>
      <div className="mt-to-header">
        <PrioritizeForm />
      </div>
    </section>
  );
}
