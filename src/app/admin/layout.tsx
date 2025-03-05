import { AdminSidebar } from '@/components/sidebars/admin-sidebar';
import { isAdmin } from '@/server/actions/auth';
import { redirect } from 'next/navigation';
import React from 'react';

// Wrap all admin routes in this layout to ensure only admins can access them
export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  // Only admins can access these routes
  const allowAccess = await isAdmin();

  if (!allowAccess.data) {
    redirect('/');
  }

  return (
    <main className="flex h-screen w-screen items-start justify-start">
      <AdminSidebar />

      <section className="h-full w-full grow overflow-y-auto" tabIndex={-1}>
        {children}
      </section>
    </main>
  );
}
