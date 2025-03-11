import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export default async function AdminEventSubeventsLoading() {
  return (
    <>
      <div className="flex justify-start gap-4">
        <Input
          placeholder="Suche nach Unterveranstaltungen..."
          disabled
          className="max-w-72"
        />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="hidden h-64 lg:block" />
        <Skeleton className="hidden h-64 lg:block" />
        <Skeleton className="hidden h-64 xl:block" />
        <Skeleton className="hidden h-64 xl:block" />
      </div>
    </>
  );
}
