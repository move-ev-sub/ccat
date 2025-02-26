import { PageContainer } from '@/components/page-container';
import { Skeleton } from '@/components/ui/skeleton';

export default async function AdminEventLoading() {
  return (
    <PageContainer>
      <Skeleton className="h-8 w-72" />
      <Skeleton className="mt-4 h-4 w-96" />
      <Skeleton className="mt-1 h-4 w-32" />
      <div className="mt-12 grid grid-cols-3 gap-8">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </PageContainer>
  );
}
