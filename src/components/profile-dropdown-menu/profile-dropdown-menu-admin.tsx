import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  BuildingOfficeIcon,
  CalendarIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';
import React from 'react';

export function ProfileDropdownMenuAdmin({
  ...props
}: React.ComponentProps<typeof DropdownMenuGroup>) {
  return (
    <DropdownMenuGroup {...props}>
      <DropdownMenuLabel>Admin</DropdownMenuLabel>
      <DropdownMenuItem>
        <CalendarIcon />
        Veranstaltungen
      </DropdownMenuItem>
      <DropdownMenuItem>
        <BuildingOfficeIcon />
        Unternehmen
      </DropdownMenuItem>
      <DropdownMenuItem>
        <UsersIcon />
        Benutzer
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
