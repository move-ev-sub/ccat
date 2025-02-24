'use client';

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { createClient } from '@/utils/supabase/client';
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import React from 'react';

export function ProfileDropdownMenuGeneral({
  ...props
}: React.ComponentProps<typeof DropdownMenuGroup>) {
  const client = createClient();
  const router = useRouter();

  const onSelectSignOut = async () => {
    await client.auth.signOut();
    router.push('/auth/login');
  };

  const onSelectSettings = () => {
    router.push('/user/settings');
  };

  return (
    <DropdownMenuGroup {...props}>
      <DropdownMenuLabel>Profil</DropdownMenuLabel>
      <DropdownMenuItem onSelect={onSelectSettings}>
        <Cog6ToothIcon />
        Einstellungen
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive" onSelect={onSelectSignOut}>
        <ArrowRightStartOnRectangleIcon />
        Abmelden
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
