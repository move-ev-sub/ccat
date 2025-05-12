import { AdminSidebar } from '@/components/sidebars/admin-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Metadata } from 'next';
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
  return (
    <SidebarProvider>
      <AdminSidebar variant="inset" />
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
