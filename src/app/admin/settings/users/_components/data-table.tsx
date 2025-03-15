/**
 * @see https://github.com/TanStack/table/blob/main/examples/react/pagination-controlled/src/main.tsx
 */
'use client';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { DataTablePagination } from './data-table-pagination';

interface DataTableProps<TData, TValue> {
  /**
   * The data which will be displayes in the table. As explained in the
   * the AdminUserSettingsPage component, we do not fetch data on the client
   * side but rather on the server as a whole.
   *
   * The data is then passed to the DataTable component as a prop.
   */
  data: TData[];

  /**
   * The column definitions for the table. This is an array of objects where
   * each object represents a column in the table. The order of the columns
   * is determined by the order of the objects in the array.
   */
  columns: ColumnDef<TData, TValue>[];
}

/**
 * The DataTable Component displays a table of UserProfiles and allows the
 * administrator to filter and sort the profiles. The DataTable component
 * is used in the AdminUserSettingsPage component.
 *
 * This is should not be treated as a generic component, but rather as ay
 *
 * @param {TData[]} TData The Data Type of the data which will be displayed
 * in the table (in this case `FullUserProfile`).
 */
export function DataTable<TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  // -------------------------------- HOOKS --------------------------------
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // ------------------------ @tanstack/react-table ------------------------
  const table = useReactTable({
    data: data,
    columns,
    rowCount: data.length,
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel<TData>(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full pt-1">
      <div className="mb-4">
        <Input
          placeholder="Suche nach E-Mail..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-72"
        />
      </div>
      <div className="w-full max-w-full overflow-x-auto">
        <Table className="w-auto min-w-full">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHeaderCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  Keine Ergebnisse gefunden.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
