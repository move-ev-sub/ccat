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

  return <main>{children}</main>;
}
