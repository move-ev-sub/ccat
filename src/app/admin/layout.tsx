import { Navbar } from '@/components/navbar';
import {
  AdminDropdownMenu,
  UserDropdownMenu,
} from '@/components/profile-dropdown-menu';
import { TopNav, TopNavItem } from '@/components/ui/top-nav';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    redirect('/auth/login');
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
