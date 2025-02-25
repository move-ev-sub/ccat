import { EventSwitch } from '@/components/event-switch';
import { Navbar } from '@/components/navbar';
import {
  AdminMobileNav,
  NavigationItem,
  SubNavigation,
  SubNavigationItem,
} from '@/components/navigation';
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
      <Navbar className="flex items-center justify-start">
        <AdminMobileNav className="ml-auto block lg:hidden">
          <div className="mb-4 px-[1.625rem]">
            <EventSwitch
              className="border-border w-full border"
              events={res.data || []}
            />
          </div>
        </AdminMobileNav>
        <div className="hidden gap-2.5 lg:flex">
          <NavigationItem href={'#'}>Veranstaltungen</NavigationItem>
          <NavigationItem href={'#'}>Nutzerverwaltung</NavigationItem>
          <NavigationItem href={'#'}>Unternehmensverwaltung</NavigationItem>
        </div>
        <div className="bg-border-secondary mx-4 hidden h-6 w-px lg:block" />
        <EventSwitch
          className="hidden border hover:bg-zinc-200 lg:flex"
          events={res.data || []}
        />
      </Navbar>
      <SubNavigation>
        <SubNavigationItem base={`/admin/event/${eventId}`} href={`/`}>
          Übersicht
        </SubNavigationItem>
        <SubNavigationItem
          base={`/admin/event/${eventId}`}
          href={'/sub-events'}
        >
          Unterveranstaltungen
        </SubNavigationItem>
        <SubNavigationItem
          base={`/admin/event/${eventId}`}
          href={'/applications'}
        >
          Bewerbungen
        </SubNavigationItem>

        <SubNavigationItem base={`/admin/event/${eventId}`} href={'/settings'}>
          Einstellungen
        </SubNavigationItem>
      </SubNavigation>
      {children}
    </>
  );
}
