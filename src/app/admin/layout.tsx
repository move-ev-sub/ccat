import { Navbar } from '@/components/navbar';
import {
  AdminDropdownMenu,
  UserDropdownMenu,
} from '@/components/profile-dropdown-menu';
import { TopNav, TopNavItem } from '@/components/ui/top-nav';
import React from 'react';

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
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
