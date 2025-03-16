'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/16/solid';
import { Table } from '@tanstack/react-table';

export function DataTablePagination<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="mt-6 flex flex-col items-start justify-start gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <div className="text-muted-foreground flex-1 text-sm">
        {/* {table.getFilteredSelectedRowModel().rows.length} of{' '} */}
        {table.getFilteredRowModel().rows.length.toLocaleString()} Ergebniss(e)
        (Seite {table.getState().pagination.pageIndex + 1} von{' '}
        {table.getPageCount().toLocaleString()})
      </div>
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center justify-center space-x-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="[&_svg]:text-foreground hidden size-8 p-0 md:flex"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Zur ersten Seite</span>
            <ChevronDoubleLeftIcon />
          </Button>
          <Button
            variant="outline"
            className="[&_svg]:text-foreground size-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Zur vorherigen Seite</span>
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            className="[&_svg]:text-foreground size-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Zur nächsten Seite</span>
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            className="[&_svg]:text-foreground hidden size-8 p-0 md:flex"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Zur letzten Seite</span>
            <ChevronDoubleRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
