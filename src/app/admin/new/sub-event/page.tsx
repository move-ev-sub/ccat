import { CreateNewSubEventForm } from '@/components/forms/create-sub-event';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { messages as t } from '@/i18n';
import { fetchCompanyProfiles } from '@/server/services/profile';
import { fetchSlotsForEvent } from '@/server/services/slot';
import { FullCompanyProfile } from '@/server/types/profile';
import { ServiceResult } from '@/server/types/serviceResult';
import { Slot } from '@prisma/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neue Unterveranstaltung',
  description: 'Hier kannst du eine neue Unterveranstaltung erstellen.',
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
    companies: FullCompanyProfile[];
    slots: Slot[];
  }>
> {
  const companiesRes = await fetchCompanyProfiles();

  // TODO: Better error handling
  if (!companiesRes.ok) {
    return companiesRes;
  }

  const slotsRes = await fetchSlotsForEvent(eventId);

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
        <CreateNewSubEventForm
          companies={companies}
          slots={slots}
          eventId={eventId}
        />
      </div>
    </>
  );
}
