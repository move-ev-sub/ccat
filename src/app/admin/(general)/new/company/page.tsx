import { BackLink } from '@/components/back-link';
import { CreateNewCompanyForm } from '@/components/forms/create-new-company';
import { PageDesc, PageTitle } from '@/components/page-header';

export default async function NewCompanyPage() {
  return (
    <div className="w-full">
      <BackLink href="/admin" className="mb-8" />
      <PageTitle>Neues Unternehmen</PageTitle>
      <PageDesc>
        Füge ein neuen Unternehmen hinzu um diesem anschließend Veranstaltungen
        zuzuweisen.
      </PageDesc>
      <div className="mt-10">
        <CreateNewCompanyForm />
      </div>
    </div>
  );
}
