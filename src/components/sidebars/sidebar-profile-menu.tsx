'use client';

import { createClient } from '@/utils/supabase/client';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/16/solid';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
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

  const onSettings = () => {
    // TODO: Redirect users to their settings page (paralell routes)
    router.push('/settings');
  };

  const onLogout = async () => {
    supabase.auth.signOut();
    router.push('/auth/login');
  };

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
            <DropdownMenuItem onSelect={onSettings}>
              <Cog6ToothIcon />
              Einstellungen
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
