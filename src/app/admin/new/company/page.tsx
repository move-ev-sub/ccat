import { BackLink } from '@/components/back-link';
import { CreateNewCompanyForm } from '@/components/forms/create-new-company';
import { PageDesc, PageTitle } from '@/components/page-header';
import { messages as t } from '@/i18n';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neues Unternehmen',
  description: 'Hier kannst du ein neues Unternehmen erstellen.',
};

export default async function NewCompanyPage() {
  return (
    <div className="w-full">
      <BackLink href="/admin" className="mb-8" />
      <PageTitle>{t.pages.newCompany.title()}</PageTitle>
      <PageDesc>{t.pages.newCompany.description()}</PageDesc>
      <div className="mt-10">
        <CreateNewCompanyForm />
      </div>
    </div>
  );
}
