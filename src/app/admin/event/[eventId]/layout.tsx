import { SubNavigation, SubNavigationItem } from '@/components/navigation';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Event Details',
  description: 'Informationen zum Event.',
};

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
      <SubNavigation base={`/admin/event/${eventId}`} className="pl-8">
        <SubNavigationItem href={`/`}>Übersicht</SubNavigationItem>
        <SubNavigationItem href={'/sub-events'}>
          Unterveranstaltungen
        </SubNavigationItem>
        <SubNavigationItem href={'/applications'}>
          Bewerbungen
        </SubNavigationItem>
        <SubNavigationItem href={'/phases'}>Phasen</SubNavigationItem>
        <SubNavigationItem href={'/settings'}>Einstellungen</SubNavigationItem>
      </SubNavigation>
      {children}
    </>
  );
}
