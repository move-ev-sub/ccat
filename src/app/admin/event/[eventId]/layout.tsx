import { SubNavigation, SubNavigationItem } from '@/components/navigation';
import { getAllEvents } from '@/server/actions/event';
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

  const res = await getAllEvents();

  if (res.error) {
    console.error(res.error);
  }

  return (
    <>
      <SubNavigation base={`/admin/event/${eventId}`}>
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
