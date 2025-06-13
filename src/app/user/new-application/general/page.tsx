import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';

export default function NewApplicationGeneralPage() {
  return (
    <section>
      <PageHeader className="px-0">
        <PageTitle>Allgemeine Informationen</PageTitle>
        <PageDesc>
          Bitte fülle die folgenden Felder aus, um deine Informationen zu
          speichern.
        </PageDesc>
      </PageHeader>
      <div className="h-to-header" />
    </section>
  );
}
