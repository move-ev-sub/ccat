import { PageDesc, PageTitle } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { ApplicationFormHeader } from '@/features/application/ui/application-form-header';
import { ApplicationGeneralForm } from '@/features/application/ui/forms/general-form';

export default function NewApplicationGeneralPage() {
  return (
    <>
      <ApplicationFormHeader>
        <PageTitle>Allgemeine Informationen</PageTitle>
        <PageDesc>
          Bitte fülle die folgenden Felder aus, um deine Informationen zu
          speichern.
        </PageDesc>
      </ApplicationFormHeader>
      <Separator className="my-12" />
      <div className="mx-auto w-full max-w-4xl px-8">
        <ApplicationGeneralForm />
      </div>
    </>
  );
}
