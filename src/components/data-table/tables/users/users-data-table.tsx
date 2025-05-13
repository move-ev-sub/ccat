'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/components/data-table/table';
import * as React from 'react';

import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { cn } from '@/lib/utils/cn';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Filterbar } from './users-data-table-filterbar';

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function UsersDataTable<TData extends { id: string }>({
  columns,
  data,
}: DataTableProps<TData>) {
  const pageSize = 20;
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    enableRowSelection: true,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div>
        <div className="border-border-secondary border-b px-8 py-8">
          <Filterbar table={table} />
        </div>
        <div className="relative overflow-hidden overflow-x-auto">
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHeaderCell
                      key={header.id}
                      className={cn(
                        'items-center text-sm first:w-10 first:!pl-8 last:!pr-8',
                        header.column.columnDef.meta?.className
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => {
                      router.push(`/admin/users/${row.original.id}`);
                    }}
                    className="group hover:bg-primary-50 hover:dark:bg-primary-900 select-none"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'relative whitespace-nowrap',
                          'first:!pl-8 last:!pr-8',
                          row.getIsSelected() && 'bg-background-muted',
                          cell.column.columnDef.meta?.className
                        )}
                      >
                        {index === 0 && row.getIsSelected() && (
                          <div className="bg-accent absolute inset-y-0 left-0 w-0.5" />
                        )}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} pageSize={pageSize} />
      </div>
    </>
  );
}
