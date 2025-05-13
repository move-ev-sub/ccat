import { Sidebar } from '@/components/layout/sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AdminRoutes } from '@/lib/consts/routes';
import {
  CalendarIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import React from 'react';

const sidebarItems = [
  {
    title: 'Dashboard',
    url: AdminRoutes.DASHBOARD,
    icon: HomeIcon,
  },
  {
    title: 'Veranstaltungen',
    url: AdminRoutes.EVENTS,
    icon: CalendarIcon,
  },
  {
    title: 'Nutzerverwaltung',
    url: AdminRoutes.USERS,
    icon: UsersIcon,
  },
  {
    title: 'Settings',
    url: AdminRoutes.PERSONAL_SETTINGS,
    icon: Cog6ToothIcon,
  },
];

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <Sidebar items={sidebarItems} variant="inset" />
      <SidebarInset className="overflow-hidden">
        <main className="w-full">
          <div className="border-border border-b px-8 py-2">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
