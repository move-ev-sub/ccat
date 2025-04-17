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

  if (!event.data) {
    return {
      title: 'Event not found',
      description: 'This event could not be found',
    };
  }

  return {
    title: event.data.name,
    description: event.data.description || 'No description available',
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
