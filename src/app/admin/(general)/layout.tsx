import { Navbar } from '@/components/navbar';
import { AdminMobileNav } from '@/components/navigation/admin-mobile-nav';
import { NavigationItem } from '@/components/navigation/navigation-item';
import React from 'react';

export default async function AdminGeneralLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <Navbar className="flex items-center justify-start">
        <AdminMobileNav className="ml-auto block lg:hidden" />
        <div className="hidden gap-2.5 lg:flex">
          <NavigationItem href={'#'}>Veranstaltungen</NavigationItem>
          <NavigationItem href={'#'}>Nutzerverwaltung</NavigationItem>
          <NavigationItem href={'#'}>Unternehmensverwaltung</NavigationItem>
        </div>
      </Navbar>
      {children}
    </>
  );
}
