import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { getSlotsForEvent } from '@/features/slot/services/slotService';
import { CreateSubEventForm } from '@/features/sub-event/ui/create-sub-event-form';
import { getAllCompanies } from '@/features/user/services/companyService';
import { Slot } from '@/generated/prisma/client';
import { messages as t } from '@/i18n';
import { ServiceResult } from '@/types';

import { User as AuthUser } from 'better-auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neue Unterveranstaltung',
  description: 'Neue Unterveranstaltung erstellen.',
};

async function hasIdParam({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  // Check if the searchParams object has an id key
  return 'eventId' in searchParams;
}

async function fetchData({ eventId }: { eventId: string }): Promise<
  ServiceResult<{
    companies: AuthUser[];
    slots: Slot[];
  }>
> {
  const companiesRes = await getAllCompanies();

  // TODO: Better error handling
  if (!companiesRes.ok) {
    return companiesRes;
  }

  const slotsRes = await getSlotsForEvent({ eventId });

  if (!slotsRes.ok) {
    return slotsRes;
  }

  const companies = companiesRes.data;
  const slots = slotsRes.data;

  if (companies.length === 0) {
    return {
      ok: false,
      error:
        'No companies were found. You need to have at least one company to create a sub-event.',
    };
  }

  if (slots.length === 0) {
    return {
      ok: false,
      error:
        'No slots were found. You need to have at least one slot to create a sub-event.',
    };
  }

  return {
    ok: true,
    data: {
      companies,
      slots,
    },
  };
}

export default async function NewSubEventPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const searchParams = await searchParamsPromise;

  const hasId = await hasIdParam({ searchParams });

  // TODO: This needs to be fixed
  if (!hasId) {
    return <p>No ID param found</p>;
  }

  const eventId = searchParams.eventId;

  const res = await fetchData({ eventId });

  if (!res.ok) {
    throw new Error(res.error);
  }

  const { companies, slots } = res.data;

  return (
    <>
      <PageHeader className="px-0">
        <PageTitle>{t.pages.newSubEvent.title()}</PageTitle>
        <PageDesc>{t.pages.newSubEvent.description()}</PageDesc>
      </PageHeader>
      <div className="mt-to-header">
        <CreateSubEventForm
          companies={companies}
          slots={slots}
          eventId={eventId}
        />
      </div>
    </>
  );
}
