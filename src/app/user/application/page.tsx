import { ApplicationGeneralForm } from '@/components/application/general-form';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';

export default function ApplicationGeneralPage() {
  return (
    <>
      <PageHeader className="mb-20 px-0">
        <PageTitle>Allgemeine Informationen</PageTitle>
        <PageDesc>
          Hier kannst du deine allgemeinen Informationen eingeben.
        </PageDesc>
      </PageHeader>
      <ApplicationGeneralForm />
    </>
  );
}
