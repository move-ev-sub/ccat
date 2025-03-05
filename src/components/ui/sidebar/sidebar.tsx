import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpDownIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';
import Image from 'next/image';
import React from 'react';
import { SidebarContent } from './sidebar-content';
import { SidebarFooter } from './sidebar-footer';
import { SidebarHeader } from './sidebar-header';
import { SidebarNav } from './sidebar-nav';
import { SidebarNavItem } from './sidebar-nav-item';

export function Sidebar({ ...props }: React.ComponentProps<'aside'>) {
  return (
    <aside
      className="border-border bg-background-muted flex h-full w-64 shrink-0 flex-col border-r [--sidebar-item-padding:0.625rem] [--sidebar-padding:1rem]"
      {...props}
    >
      <SidebarHeader className="border-border border-b">
        <div className="px-(--sidebar-item-padding)">
          <Image
            src={'/move-logo.svg'}
            alt="move-logo"
            width={496}
            height={116}
            className="h-fit w-full"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav base="/user">
          <SidebarNavItem href={'/'}>
            <HomeIcon />
            Dashboard
          </SidebarNavItem>
          <SidebarNavItem href={'/test1'}>
            <UsersIcon />
            Nutzerverwaltung
          </SidebarNavItem>
          <SidebarNavItem href={'/test2'}>
            <Cog6ToothIcon />
            Settings
          </SidebarNavItem>
        </SidebarNav>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="border-border bg-background focus-visible:ring-ring focus-visible:ring-offset-background-muted flex w-full items-center justify-start gap-2.5 rounded-lg border px-(--sidebar-item-padding) py-1.5 hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
              <span className="text-foreground truncate text-sm font-medium">
                viadee@move-ev.de
              </span>

              <ChevronUpDownIcon className="text-secondary ml-auto size-4 shrink-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Cog6ToothIcon />
                  Einstellungen
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <ArrowRightStartOnRectangleIcon />
                  Abmelden
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </SidebarFooter>
    </aside>
  );
}
