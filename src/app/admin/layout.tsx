import { Sidebar } from '@/components/layout/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/lib/api/auth';
import { AdminRoutes } from '@/lib/consts/routes';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

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
      <Sidebar
        items={[
          {
            title: 'Dashboard',
            url: AdminRoutes.DASHBOARD,
            icon: 'home',
          },
          {
            title: 'Veranstaltungen',
            url: AdminRoutes.EVENTS,
            icon: 'events',
          },
          {
            title: 'Nutzerverwaltung',
            url: AdminRoutes.USERS,
            icon: 'users',
          },
          {
            title: 'Settings',
            url: AdminRoutes.PERSONAL_SETTINGS,
            icon: 'settings',
          },
        ]}
        session={session}
      />
      <SidebarInset className="overflow-hidden">
        <main className="w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
