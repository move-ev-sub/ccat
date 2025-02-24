import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';
import { ProfileDropdownMenuAdmin } from './profile-dropdown-menu-admin';
import { ProfileDropdownMenuGeneral } from './profile-dropdown-menu-general';

export function AdminDropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenu>) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger className="focus-visible:ring-ring focus-visible:ring-offset-background-muted rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
        <Avatar>
          <AvatarFallback>
            <span className="text-xs">JD</span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          sideOffset={4}
          className="w-72"
          side="bottom"
          collisionPadding={32}
        >
          <ProfileDropdownMenuAdmin />
          <DropdownMenuSeparator />
          <ProfileDropdownMenuGeneral />
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
