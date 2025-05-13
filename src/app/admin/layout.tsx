import { Sidebar } from '@/components/layout/sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/api/auth';
import { AdminRoutes } from '@/lib/consts/routes';
import {
  CalendarIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <SidebarProvider>
      <Sidebar items={sidebarItems} session={session} variant="inset" />
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
