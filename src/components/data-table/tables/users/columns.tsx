'use client';

import { Badge } from '@/components/ui/badge';
import { User as PrismaUser } from '@/generated/prisma/client';
import { cn } from '@/utils';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DataTableColumnHeader } from '../../data-table-column-header';

const columnHelper = createColumnHelper<PrismaUser>();

export const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    meta: {
      displayName: 'Name',
    },
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-Mail" />
    ),
    meta: {
      displayName: 'E-Mail',
    },
    enableSorting: true,
    enableHiding: true,
  }),
  columnHelper.accessor('role', {
    id: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rolle" />
    ),
    meta: {
      displayName: 'Rolle',
    },
    cell: ({ row }) => {
      const role = row.original.role;
      switch (role) {
        case 'admin':
          return (
            <Badge
              className={cn(
                'block rounded-full border-solid !px-2',
                'border-red-500 bg-red-100 text-red-700'
              )}
            >
              Administrator
            </Badge>
          );
        case 'company':
          return (
            <Badge
              className={cn(
                'block rounded-full border-solid !px-2',
                'border-blue-500 bg-blue-100 text-blue-700'
              )}
            >
              Unternehmen
            </Badge>
          );
        default:
          return (
            <Badge className={cn('block rounded-full border-solid !px-2')}>
              Benutzer
            </Badge>
          );
      }
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: 'arrIncludesSome',
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Erstellt am" />
    ),
    meta: {
      displayName: 'Erstellt am',
    },
    cell: ({ row }) => {
      return <div>{format(row.original.createdAt, 'dd.MM.yyyy, HH:mm')}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  }),
  columnHelper.accessor('emailVerified', {
    id: 'emailVerified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-Mail bestätigt" />
    ),
    meta: {
      displayName: 'E-Mail bestätigt',
    },
    cell: ({ row }) => {
      return row.original.emailVerified ? (
        <Badge
          className={cn(
            'block rounded-full border-solid !px-2',
            'border-green-500 bg-green-100 text-green-700'
          )}
        >
          Ja
        </Badge>
      ) : (
        <Badge className={cn('block rounded-full border-solid !px-2')}>
          Nein
        </Badge>
      );
    },

    enableSorting: false,
    enableHiding: true,
  }),
] as ColumnDef<PrismaUser>[];
