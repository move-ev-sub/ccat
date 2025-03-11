import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';

export default async function AdminCompaniesUsersPage({}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Nutzerverwaltung</PageTitle>
        <PageDesc>
          Hier kannst du alle Benutzer verwalten. Beachte, dass hier alle
          Benutzer angezeigt werden, sowohl Bewerber:innnen als auch
          Unternehmen.
        </PageDesc>
      </PageHeader>
    </PageContainer>
  );
}
