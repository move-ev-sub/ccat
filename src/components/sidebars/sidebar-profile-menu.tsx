'use client';

import { createClient } from '@/utils/supabase/client';
import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronUpDownIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/16/solid';
import { User } from '@supabase/supabase-js';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
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

export function SidebarProfileMenu({
  user,
  ...props
}: React.ComponentProps<typeof DropdownMenu> & {
  user: User;
}) {
  const supabase = createClient();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const onSettings = () => {
    // TODO: Redirect users to their settings page (paralell routes)
    router.push('/settings');
  };

  const onLogout = async () => {
    supabase.auth.signOut();
    router.push('/auth/login');
  };

  const onSetTheme = async (theme: 'light' | 'dark' | 'system') => {
    setTheme(theme);
  };

  const onDocumentation = () => {};

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <button className="border-border bg-background focus-visible:ring-ring focus-visible:ring-offset-background-muted flex w-full items-center justify-start gap-2.5 rounded-lg border px-(--sidebar-item-padding) py-1.5 hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
          <span className="text-foreground truncate text-sm font-medium">
            {user.email ?? 'Unbekannt'}
          </span>

          <ChevronUpDownIcon className="text-secondary ml-auto size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="truncate">
              christoph.langer100@gmail.com
            </DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
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
            <DropdownMenuItem onSelect={onDocumentation}>
              Dokumentation
              <ArrowUpRightIcon className="ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert('Not set')}>
              Changelog
              <ArrowUpRightIcon className="ml-auto" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={onSettings}>
              Einstellungen
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={onLogout}>
              Abmelden
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
