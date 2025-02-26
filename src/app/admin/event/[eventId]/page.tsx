import { PageContainer } from '@/components/page-container';
import { Badge } from '@/components/ui/badge';
import { getEvent } from '@/server/actions/event';
import {
  EyeIcon,
  InboxArrowDownIcon,
  InboxStackIcon,
} from '@heroicons/react/16/solid';
import { notFound } from 'next/navigation';

export default async function AdminEventOverviewPage({
  params,
}: {
  params: Promise<{
    eventId: string;
  }>;
}) {
  const eventId = (await params).eventId;

  const res = await getEvent(eventId);

  if (res.error || !res.data) {
    notFound();
  }

  const { name, status, description } = res.data;

  return (
    <PageContainer>
      <div className="flex flex-col-reverse items-start justify-center gap-4 sm:flex-row sm:items-center sm:justify-start">
        <h1 className="text-foreground w-fit items-center justify-start text-2xl font-medium sm:text-xl">
          {name}
        </h1>
        {status == 'archived' && (
          <Badge variant={'warn'}>
            <InboxArrowDownIcon />
            Archiviert
          </Badge>
        )}
        {status == 'draft' && (
          <Badge variant={'default'}>
            <InboxStackIcon />
            Entwurf
          </Badge>
        )}
        {status == 'published' && (
          <Badge variant={'success'}>
            <EyeIcon />
            Veröffentlicht
          </Badge>
        )}
      </div>
      {description && (
        <p className="text-secondary mt-4 max-w-prose sm:mt-2 sm:text-sm">
          {description}
        </p>
      )}
      <div className="mt-12 grid grid-cols-3 gap-8">
        {/* Render for divs from a loop */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-border-secondary min-h-32 w-full rounded-xl border border-dashed"
          />
        ))}
      </div>
    </PageContainer>
  );
}
