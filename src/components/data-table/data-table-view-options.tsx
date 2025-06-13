'use client';

import { Column, Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { EyeIcon } from '@heroicons/react/16/solid';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface DataTableViewOptionsProps<TData>
  extends React.ComponentProps<typeof DropdownMenuTrigger> {
  table: Table<TData>;
}

export function ViewOptions<TData>({
  table,
  ...props
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild {...props}>
        <Button variant="outline">
          <EyeIcon className="text-secondary" />
          Anzeigeoptionen
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column: Column<TData, unknown>) => column.getCanHide())
          .map((column: Column<TData, unknown>) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.columnDef.meta?.displayName as string}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
