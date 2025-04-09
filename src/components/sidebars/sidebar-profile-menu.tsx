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
import Link from 'next/link';
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

  const onLogout = async () => {
    supabase.auth.signOut();
    router.push('/auth/login');
  };

  const onSetTheme = async (theme: 'light' | 'dark' | 'system') => {
    setTheme(theme);
  };

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <button className="border-border bg-background focus-indicator focus-visible:ring-offset-background-muted hover:bg-background-muted flex w-full items-center justify-start gap-2.5 rounded-lg border px-2.5 py-1.5">
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
            <DropdownMenuItem asChild>
              <Link href={'https://docs.consultingcontact.de'} target="_blank">
                Dokumentation
                <ArrowUpRightIcon className="ml-auto" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={'https://github.com/move-ev-sub/ccat/releases'}
                target="_blank"
              >
                Changelog
                <ArrowUpRightIcon className="ml-auto" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              {/* TODO: Redirect users to their own settings page */}
              <Link href={'/settings'}>Einstellungen</Link>
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
