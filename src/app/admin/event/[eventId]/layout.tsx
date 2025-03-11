import { SubNavigation, SubNavigationItem } from '@/components/navigation';
import { BreadCrumbs } from '@/components/ui/breadcrumbs/breadcrumbs';
import { Crumb } from '@/components/ui/breadcrumbs/crumb';
import React from 'react';

export default async function AdminEventLayout({
  children,
  params,
}: React.PropsWithChildren & {
  params: Promise<{
    eventId: string;
  }>;
}) {
  const eventId = (await params).eventId;

  return (
    <>
      <div className="border-border border-b px-8 py-4">
        <BreadCrumbs>
          <Crumb href={'/admin/event'}>Veranstaltungen</Crumb>
          <Crumb href={'/admin/event'}>Consulting Contact</Crumb>
        </BreadCrumbs>
      </div>
      <SubNavigation base={`/admin/event/${eventId}`} className="pl-8">
        <SubNavigationItem href={`/`}>Übersicht</SubNavigationItem>
        <SubNavigationItem href={'/sub-events'}>
          Unterveranstaltungen
        </SubNavigationItem>
        <SubNavigationItem href={'/applications'}>
          Bewerbungen
        </SubNavigationItem>
        <SubNavigationItem href={'/settings'}>Einstellungen</SubNavigationItem>
      </SubNavigation>
      {children}
    </>
  );
}
