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
import { DocumentCheckIcon, HomeIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { SidebarProfileMenu } from './sidebar-profile-menu';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: HomeIcon,
  },
];

export async function CompanySidebar({}: React.ComponentProps<
  typeof Sidebar
> & {}) {
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
            <SidebarMenu base="/company">
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
        <SidebarProfileMenu
          user={{
            id: '',
            email: 'christoph.langer100@gmail.com',
            app_metadata: {},
            user_metadata: {},
            aud: '',
            created_at: 'new Date(),',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
