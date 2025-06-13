'use client';

import * as SidebarPrimitive from '@/components/ui/sidebar';
import { signOut } from '@/features/auth/services/authService';
import { SiteConfig } from '@/lib/config/site';
import { AdminRoutes, CompanyRoutes, UserRoutes } from '@/lib/consts/routes';
import { Session } from '@/types/auth';
import {
  ArrowRightStartOnRectangleIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  CalendarIcon,
  CheckIcon,
  ChevronUpDownIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  DocumentPlusIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import MoveLogo from '../../../public/move-logo.svg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

// Menu items.
// const items = [
//   {
//     title: 'Dashboard',
//     url: AdminRoutes.DASHBOARD,
//     icon: HomeIcon,
//   },
//   {
//     title: 'Veranstaltungen',
//     url: AdminRoutes.EVENTS,
//     icon: CalendarIcon,
//   },
//   {
//     title: 'Nutzerverwaltung',
//     url: AdminRoutes.USERS,
//     icon: UsersIcon,
//   },
//   {
//     title: 'Settings',
//     url: AdminRoutes.PERSONAL_SETTINGS,
//     icon: Cog6ToothIcon,
//   },
// ];

const IconsMap = {
  home: <HomeIcon />,
  events: <CalendarIcon />,
  users: <UsersIcon />,
  settings: <Cog6ToothIcon />,
};

interface SidebarProps
  extends React.ComponentProps<typeof SidebarPrimitive.Sidebar> {
  items: {
    title: string;
    url: string;
    type?: 'admin' | 'user';
    icon: keyof typeof IconsMap;
  }[];
  session: Session;
}

export function Sidebar({ items, session, ...props }: SidebarProps) {
  return (
    <SidebarPrimitive.Sidebar {...props}>
      <SidebarPrimitive.SidebarContent>
        <SidebarPrimitive.SidebarHeader className="h-12">
          <Image src={MoveLogo} alt="Move Logo" className="h-full w-fit" />
        </SidebarPrimitive.SidebarHeader>
        <SidebarPrimitive.SidebarSeparator />
        <SidebarPrimitive.SidebarGroup>
          <SidebarPrimitive.SidebarGroupLabel>
            Navigation
          </SidebarPrimitive.SidebarGroupLabel>
          <SidebarPrimitive.SidebarGroupContent>
            <SidebarPrimitive.SidebarMenu base="">
              {items.map((item) => (
                <SidebarPrimitive.SidebarMenuItem key={item.title}>
                  <SidebarPrimitive.SidebarMenuLink href={item.url}>
                    {IconsMap[item.icon]}

                    <span>{item.title}</span>
                  </SidebarPrimitive.SidebarMenuLink>
                </SidebarPrimitive.SidebarMenuItem>
              ))}
            </SidebarPrimitive.SidebarMenu>
          </SidebarPrimitive.SidebarGroupContent>
        </SidebarPrimitive.SidebarGroup>
      </SidebarPrimitive.SidebarContent>
      <SidebarPrimitive.SidebarFooter>
        <SidebarProfileMenu session={session} />
      </SidebarPrimitive.SidebarFooter>
    </SidebarPrimitive.Sidebar>
  );
}

export function SidebarProfileMenu({
  session,
  ...props
}: React.ComponentProps<typeof DropdownMenu> & {
  session: Session;
}) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const onLogout = async () => {
    await signOut();
    router.push('/auth/login');
  };

  const onSetTheme = async (theme: 'light' | 'dark' | 'system') => {
    setTheme(theme);
  };

  const user = session.user;

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <button className="border-border bg-background focus-indicator focus-visible:ring-offset-background-muted hover:bg-background-muted flex w-full items-center justify-start gap-2.5 rounded-lg border px-2.5 py-1.5">
          <span className="text-foreground truncate text-sm font-medium">
            {user.email}
          </span>
          <ChevronUpDownIcon className="text-secondary ml-auto size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="truncate">
              {user.email}
            </DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {theme === 'light' ? (
                  <SunIcon />
                ) : theme === 'dark' ? (
                  <MoonIcon />
                ) : (
                  <ComputerDesktopIcon />
                )}
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="group"
                  onSelect={() => onSetTheme('light')}
                  data-active={theme === 'light'}
                >
                  <SunIcon />
                  Light
                  <CheckIcon className="ml-auto hidden group-data-[active=true]:block" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="group"
                  onSelect={() => onSetTheme('dark')}
                  data-active={theme === 'dark'}
                >
                  <MoonIcon />
                  Dark
                  <CheckIcon className="ml-auto hidden group-data-[active=true]:block" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="group"
                  onSelect={() => onSetTheme('system')}
                  data-active={theme === 'system'}
                >
                  <ComputerDesktopIcon />
                  System
                  <CheckIcon className="ml-auto hidden group-data-[active=true]:block" />
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={SiteConfig.links.docs} target="_blank">
                <BookOpenIcon />
                Dokumentation
                <ArrowUpRightIcon className="ml-auto" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={SiteConfig.links.changelog} target="_blank">
                <DocumentPlusIcon />
                Changelog
                <ArrowUpRightIcon className="ml-auto" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              {/* TODO: Redirect users to their own settings page */}
              <Link
                href={
                  user.role == 'admin'
                    ? AdminRoutes.PERSONAL_SETTINGS
                    : user.role == 'company'
                      ? CompanyRoutes.PERSONAL_SETTINGS
                      : UserRoutes.PERSONAL_SETTINGS
                }
              >
                <Cog6ToothIcon />
                Einstellungen
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={onLogout}>
              <ArrowRightStartOnRectangleIcon />
              Abmelden
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
