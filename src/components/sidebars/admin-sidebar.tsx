'use server';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
} from '@/components/ui/sidebar';
import { AdminRoutes } from '@/constants/routes';
import { auth } from '@/utils/auth';
import {
  CalendarIcon,
  Cog6ToothIcon,
  DocumentCheckIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';
import { headers } from 'next/headers';
import React from 'react';
import { SidebarProfileMenu } from './sidebar-profile-menu';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: AdminRoutes.DASHBOARD,
    icon: HomeIcon,
  },
  {
    title: 'Veranstaltungen',
    url: AdminRoutes.EVENTS,
    icon: CalendarIcon,
  },
  {
    title: 'Nutzerverwaltung',
    url: AdminRoutes.USERS,
    icon: UsersIcon,
  },
  {
    title: 'Settings',
    url: AdminRoutes.PERSONAL_SETTINGS,
    icon: Cog6ToothIcon,
  },
];

export async function AdminSidebar({}: React.ComponentProps<
  typeof Sidebar
> & {}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('User is not authenticated.');
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <div className="flex items-center justify-start gap-4 p-2">
            <div className="bg-background border-border-secondary rounded-md border p-2">
              <DocumentCheckIcon className="text-accent size-4" />
            </div>
            <p className="text-foreground font-medium">CCAT</p>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu base="">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuLink href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarProfileMenu session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}
