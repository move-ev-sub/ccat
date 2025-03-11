import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';

export default async function AdminCompaniesUsersLoading() {
  return (
    <>
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
      <div className="mt-to-header container space-y-6">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    </>
  );
}
