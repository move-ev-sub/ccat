'use client';

import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { ConfirmDestructive } from '@/components/ui/confirm-destructive';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FullUserProfile } from '@/server/types/profile';
import { EllipsisHorizontalIcon } from '@heroicons/react/16/solid';
import React from 'react';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends FullUserProfile>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [_open, _setOpen] = React.useState(false);

  return (
    <>
      <ConfirmDestructive
        open={_open}
        onOpenChange={_setOpen}
        title="Bist du sicher, dass du dieses Konto löschen möchtest?"
        auditText={row.original.email}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <EllipsisHorizontalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Passwort zurücksetzen</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => _setOpen(true)}
          >
            Konto löschen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
