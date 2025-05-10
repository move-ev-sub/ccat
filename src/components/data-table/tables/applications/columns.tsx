'use client';

import { Badge } from '@/components/ui/badge';
import { FullSubApplication } from '@/server/types/sub-application';
import {
  cn,
  translateDegree,
  translatePriorization,
  translateStatus,
} from '@/utils';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../data-table-column-header';
import { DataTableRowActions } from '../../data-table-row-actions';
import { ConditionFilter } from '../../filters/types';

const columnHelper = createColumnHelper<FullSubApplication>();

export const columns = [
  // columnHelper.display({
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected()
  //           ? true
  //           : table.getIsSomeRowsSelected()
  //             ? 'indeterminate'
  //             : false
  //       }
  //       onCheckedChange={() => table.toggleAllPageRowsSelected()}
  //       className="translate-y-0.5"
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={() => row.toggleSelected()}
  //       className="translate-y-0.5"
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  //   meta: {
  //     displayName: 'Select',
  //   },
  // }),
  columnHelper.accessor(
    (row) => `${row.application.firstName} ${row.application.lastName}`,
    {
      id: 'fullName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      enableSorting: true,
      enableHiding: false,
    }
  ),
  columnHelper.accessor('application.currentDegree', {
    id: 'currentDegree',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aktueller Abschluss" />
    ),
    cell: ({ row }) => {
      return translateDegree(row.original.application.currentDegree);
    },
    meta: {
      displayName: 'Aktueller Abschluss',
    },
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
  }),
  columnHelper.accessor('application.targetDegree', {
    id: 'targetDegree',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Angestrebter Abschluss" />
    ),
    cell: ({ row }) => {
      return translateDegree(row.original.application.targetDegree);
    },
    meta: {
      displayName: 'Angestrebter Abschluss',
    },
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('application.fieldOfStudy', {
    id: 'fieldOfStudy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Studiengang" />
    ),
    meta: {
      displayName: 'Studiengang',
    },
    enableSorting: true,
  }),
  columnHelper.accessor('application.abiturGrade', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Abiturnote" />
    ),
    meta: {
      displayName: 'Abiturnote',
    },
    cell: ({ row }) => {
      return row.original.application.abiturGrade.toFixed(1);
    },
    enableSorting: true,
    filterFn: (row, columnId, filterValue: ConditionFilter) => {
      if (!filterValue) return true;

      const value = row.getValue(columnId) as number;
      const [min, max] = filterValue.value as [number, number];

      switch (filterValue.condition) {
        case 'is-equal-to':
          return value == min;
        case 'is-between':
          return value >= min && value <= max;
        case 'is-greater-than':
          return value > min;
        case 'is-less-than':
          return value < min;
        default:
          return true;
      }
    },
  }),
  columnHelper.accessor('application.currentGpa', {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Derzeitiger Notendurchschnitt"
      />
    ),
    meta: {
      displayName: 'Derzeitiger Notendurchschnitt',
    },
    cell: ({ row }) => {
      return row.original.application.currentGpa.toFixed(1);
    },
    enableSorting: true,
  }),
  columnHelper.accessor('priorization', {
    id: 'priorization',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priorität" />
    ),
    meta: {
      displayName: 'Priorität',
    },
    cell: ({ row }) => {
      const priorization = row.original.priorization;
      return (
        <Badge
          className={cn(
            'block rounded-full border-solid !px-2',
            priorization === 'PRIO_1' &&
              'border-green-500 bg-green-100 text-green-700',
            priorization === 'PRIO_2' &&
              'border-blue-500 bg-blue-100 text-blue-700',
            priorization === 'PRIO_3' &&
              'border-yellow-500 bg-yellow-100 text-yellow-700',
            priorization === 'PRIO_4' &&
              'border-orange-500 bg-orange-100 text-orange-700',
            priorization === 'PRIO_5' &&
              'border-red-500 bg-red-100 text-red-700'
          )}
        >
          {translatePriorization(priorization)}
        </Badge>
      );
    },
    enableSorting: true,
  }),
  columnHelper.accessor('status', {
    id: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    meta: {
      displayName: 'Status',
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={cn(
            'block rounded-full border-solid !px-2',
            status === 'ACCEPTED' &&
              'border-green-500 bg-green-100 text-green-700',
            status === 'REJECTED' && 'border-red-500 bg-red-100 text-red-700'
          )}
        >
          {translateStatus(status)}
        </Badge>
      );
    },
    enableSorting: true,
  }),

  columnHelper.display({
    id: 'edit',
    header: 'Aktionen',
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: 'text-right',
      displayName: 'Aktionen',
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
] as ColumnDef<FullSubApplication>[];
