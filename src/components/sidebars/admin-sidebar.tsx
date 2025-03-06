'use server';

import {
  Sidebar,
  SidebarContent,
  SidebarNav,
  SidebarNavItem,
} from '@/components/ui/sidebar';
import {
  BuildingOfficeIcon,
  CalendarIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';
import React from 'react';
import { DefaultSidebarFooter } from './default-sidebar-footer';
import { DefaultSidebarHeader } from './default-sidebar-header';

export async function AdminSidebar({}: React.ComponentProps<
  typeof Sidebar
> & {}) {
  return (
    <Sidebar>
      <DefaultSidebarHeader />
      <SidebarContent>
        <SidebarNav base="/admin">
          <SidebarNavItem href={'/'}>
            <HomeIcon />
            Dashboard
          </SidebarNavItem>
          <SidebarNavItem href={'/event'}>
            <CalendarIcon />
            Veranstaltungen
          </SidebarNavItem>
          <SidebarNavItem href={'/settings/users'}>
            <UsersIcon />
            Nutzer
          </SidebarNavItem>
          <SidebarNavItem href={'/settings/companies'}>
            <BuildingOfficeIcon />
            Unternehmen
          </SidebarNavItem>
          <SidebarNavItem href={'/settings/general'}>
            <Cog6ToothIcon />
            Einstellungen
          </SidebarNavItem>
        </SidebarNav>
      </SidebarContent>
      <DefaultSidebarFooter />
    </Sidebar>
  );
}
