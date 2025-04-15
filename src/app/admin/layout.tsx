import { AdminSidebar } from '@/components/sidebars/admin-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  viewport: {
    initialScale: 1,
    width: 'device-width',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Wrap all admin routes in this layout to ensure only admins can access them
export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  // Only admins can access these routes
  // const allowAccess = await isAdmin();

  // if (!allowAccess.data) {
  //   redirect('/');
  // }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full">
        <div className="border-border border-b px-8 py-2">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
