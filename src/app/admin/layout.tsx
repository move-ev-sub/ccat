import { EventSwitch } from '@/components/event-switch';
import { Navbar } from '@/components/navbar';
import { SubNavigation, SubNavigationItem } from '@/components/navigation';
import {
  AdminDropdownMenu,
  UserDropdownMenu,
} from '@/components/profile-dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { TopNav, TopNavItem } from '@/components/ui/top-nav';
import { isAdmin } from '@/server/actions/auth';
import {
  ArrowRightStartOnRectangleIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  FolderIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  const allowAccess = await isAdmin();

  if (!allowAccess.data) {
    redirect('/');
  }

  return (
    <main>
      <Navbar className="flex">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent
            sheetTitle="Mobile Navigation"
            className="flex flex-col"
          >
            <div className="grid gap-4 px-4 py-4">
              <EventSwitch
                className="border-border w-full border"
                events={[
                  {
                    id: '1',
                    name: 'Event 1',
                    createdBy: 'User 1',
                    description: 'Description 1',
                    status: 'archived',
                    lastUpdated: new Date(),
                  },
                  {
                    id: '2',
                    name: 'Event 2',
                    createdBy: 'User 2',
                    description: 'Description 2',
                    status: 'draft',
                    lastUpdated: new Date(),
                  },
                  {
                    id: 'dsf',
                    name: 'Consulting Contact 2025 Test',
                    createdBy: 'User 3',
                    description: 'Description 3',
                    status: 'published',
                    lastUpdated: new Date(),
                  },
                ]}
              />
            </div>
            <div className="mt-8 p-4">
              <div className="flex items-center justify-start gap-2.5">
                <span className="text-foreground block text-xs font-medium">
                  Admin
                </span>
                <div className="bg-border h-px w-full grow" />
              </div>
              <div className="mt-2 space-y-2">
                <button className="text-foreground hover:bg-background-muted focus-visible:ring-ring active:bg-background-muted flex w-full items-center justify-start gap-2.5 rounded-lg px-2 py-1.5 font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-sm">
                  <CalendarIcon className="text-secondary size-4" />
                  Veranstaltungen
                </button>
                <button className="text-foreground hover:bg-background-muted focus-visible:ring-ring active:bg-background-muted flex w-full items-center justify-start gap-2.5 rounded-lg px-2 py-1.5 font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-sm">
                  <UsersIcon className="text-secondary size-4" />
                  Nutzerverwaltung
                </button>
                <button className="text-foreground hover:bg-background-muted focus-visible:ring-ring active:bg-background-muted flex w-full items-center justify-start gap-2.5 rounded-lg px-2 py-1.5 font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-sm">
                  <BuildingOfficeIcon className="text-secondary size-4" />
                  Unternehmensverwaltung
                </button>
              </div>
            </div>
            <div className="mt-8 p-4">
              <div className="flex items-center justify-start gap-2.5">
                <span className="text-foreground block text-xs font-medium">
                  Veranstaltung
                </span>
                <div className="bg-border h-px w-full grow" />
              </div>
              <div className="mt-2 space-y-2">
                <button className="text-foreground hover:bg-background-muted focus-visible:ring-ring active:bg-background-muted flex w-full items-center justify-start gap-2.5 rounded-lg px-2 py-1.5 font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-sm">
                  <CalendarIcon className="text-secondary size-4" />
                  Unterveranstaltungen
                </button>
                <button className="text-foreground hover:bg-background-muted focus-visible:ring-ring active:bg-background-muted flex w-full items-center justify-start gap-2.5 rounded-lg px-2 py-1.5 font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-sm">
                  <DocumentTextIcon className="text-secondary size-4" />
                  Bewerbungen
                </button>
                <button className="text-foreground hover:bg-background-muted focus-visible:ring-ring active:bg-background-muted flex w-full items-center justify-start gap-2.5 rounded-lg px-2 py-1.5 font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-sm">
                  <FolderIcon className="text-secondary size-4" />
                  Eventeinstellungen
                </button>
              </div>
            </div>
            <div className="mt-auto w-full space-y-2 p-4">
              <div className="bg-border mx-auto h-px w-[calc(100%-1rem)]" />

              <button className="text-foreground hover:bg-background-muted focus-visible:ring-ring active:bg-background-muted flex w-full items-center justify-start gap-2.5 rounded-lg px-2 py-1.5 font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-sm">
                <Cog6ToothIcon className="text-secondary size-4" />
                Einstellungen
              </button>
              <button className="active:bg-destructive/10 text-destructive hover:bg-destructive/10 focus-visible:bg-destructive/10 flex w-full items-center justify-start gap-2.5 rounded-lg px-2 py-1.5 font-medium focus-visible:outline-none sm:text-sm">
                <ArrowRightStartOnRectangleIcon className="text-destructive size-4" />
                Abmelden
              </button>
            </div>
          </SheetContent>
        </Sheet>
        <TopNav className="mr-auto">
          <TopNavItem href={'#'}>Home</TopNavItem>
          <TopNavItem href={'#'}>About</TopNavItem>
          <TopNavItem href={'#'}>Contact</TopNavItem>
        </TopNav>
        <UserDropdownMenu />
        <AdminDropdownMenu />
      </Navbar>
      <SubNavigation>
        <SubNavigationItem data-active={true} href="#">
          Übersicht
        </SubNavigationItem>
        <SubNavigationItem href="#">Unterveranstaltungen</SubNavigationItem>
        <SubNavigationItem href="#">Einstellungen</SubNavigationItem>
      </SubNavigation>
      {children}
    </main>
  );
}
