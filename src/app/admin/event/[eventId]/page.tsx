import { PageContainer } from '@/components/page-container';
import { PageDesc, PageTitle } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { getEvent } from '@/server/actions/event';
import {
  EyeIcon,
  InboxArrowDownIcon,
  InboxStackIcon,
} from '@heroicons/react/16/solid';

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
    return (
      <p>
        Not found
        {JSON.stringify(res.error)}
      </p>
    );
  }

  const { name, status, description } = res.data;

  return (
    <PageContainer>
      <div className="flex flex-col-reverse items-start justify-center gap-4 sm:flex-row sm:items-center sm:justify-start">
        <PageTitle>{name}</PageTitle>
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

      {description && <PageDesc>{description}</PageDesc>}

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
