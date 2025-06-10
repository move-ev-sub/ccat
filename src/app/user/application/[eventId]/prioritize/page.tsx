'use client';

import { PageDesc, PageTitle } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { ApplicationFormHeader } from '@/features/application/ui/application-form-header';
import { PrioritizeForm } from '@/features/application/ui/forms/prioritize-form';

export default function NewApplicationPrioritizePage() {
  return (
    <>
      <ApplicationFormHeader>
        <PageTitle>Prioritäten festlegen</PageTitle>
        <PageDesc>
          Bitte fülle die folgenden Felder aus, um deine Informationen zu
          speichern.
        </PageDesc>
      </ApplicationFormHeader>
      <Separator className="my-12" />
      <div className="mx-auto w-full max-w-4xl px-8">
        <PrioritizeForm />
      </div>
    </>
  );
}
