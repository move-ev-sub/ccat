import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';

export default async function UserOverviewLoading() {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Deine Übersicht</PageTitle>
        <PageDesc>
          Hier siehst du alle deine Bewerbungen, die du bisher abgeschickt hast.
        </PageDesc>
      </PageHeader>
      <div className="mt-to-header container grid gap-8 lg:grid-cols-2">
        <Skeleton className="min-h-48 w-full" />
        <Skeleton className="min-h-48 w-full" />
      </div>
    </PageContainer>
  );
}
