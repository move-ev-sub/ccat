import { Navbar } from '@/components/navbar';
import {
  AdminDropdownMenu,
  UserDropdownMenu,
} from '@/components/profile-dropdown-menu';
import { TopNav, TopNavItem } from '@/components/ui/top-nav';
import { isAdmin } from '@/server/actions/auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  const allowAccess = await isAdmin();

  if (!allowAccess) {
    redirect('/');
  }

  return (
    <main>
      <Navbar className="flex">
        <TopNav className="mr-auto">
          <TopNavItem href={'#'}>Home</TopNavItem>
          <TopNavItem href={'#'}>About</TopNavItem>
          <TopNavItem href={'#'}>Contact</TopNavItem>
        </TopNav>
        <UserDropdownMenu />
        <AdminDropdownMenu />
      </Navbar>
      {children}
    </main>
  );
}
