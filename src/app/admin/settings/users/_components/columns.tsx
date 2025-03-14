'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { FullUserProfile } from '@/server/types/profile';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

/**
 * The column definition for the DataTable component which is displayed in the
 * AdminUserSettings Page.
 *
 * We display the following columns:
 *
 * - Name: The full name of the user including the first and last name and an
 *  avatar with the initials of the user.
 * - Email: The email address of the user.
 * - Role: The role of the user (In this case we only have the role "USER").
 * - Created At: The date when the user was created. Formatted as "dd.MM.yyyy".
 * - Row Action: Row actions for editing and deleting the user.
 */
export const columns: ColumnDef<FullUserProfile>[] = [
  {
    id: 'name',
    accessorFn: (row) => row.userProfile?.firstName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        <Avatar className="mr-4">
          <AvatarFallback className="text-xs">
            {row.original.userProfile?.firstName?.charAt(0)}
            {row.original.userProfile?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium whitespace-nowrap">
          {row.original.userProfile?.firstName}{' '}
          {row.original.userProfile?.lastName}
        </span>
      </div>
    ),
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: ({}) => <div>Rolle</div>,
    cell: ({ row }) => (
      <div>{row.original.role == 'USER' && <Badge>Nutzer</Badge>}</div>
    ),
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Erstellt am" />
    ),
    cell: ({ row }) => (
      <div>{format(row.original.createdAt, 'dd.MM.yyyy')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
