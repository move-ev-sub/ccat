import { Navbar } from '@/components/navbar';
import { TopNav, TopNavItem } from '@/components/ui/top-nav';
import React from 'react';

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <main>
      <Navbar>
        <TopNav>
          <TopNavItem href={'#'}>Home</TopNavItem>
          <TopNavItem href={'#'}>About</TopNavItem>
          <TopNavItem href={'#'}>Contact</TopNavItem>
        </TopNav>
      </Navbar>
      {children}
    </main>
  );
}
