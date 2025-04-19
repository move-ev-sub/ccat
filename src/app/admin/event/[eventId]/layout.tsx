import { SubNavigation, SubNavigationItem } from '@/components/navigation';
import { getEvent } from '@/server/actions/event';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({
  params: { eventId },
}: {
  params: { eventId: string };
}): Promise<Metadata> {
  const event = await getEvent(eventId);

  return {
    title: event.data?.name,
    description: `Hier können alle Informationen zur ${event.data?.name} einsehen.`,
  };
}

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
