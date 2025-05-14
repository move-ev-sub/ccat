import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/16/solid';
import { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSize: number;
}

export function DataTablePagination<TData>({
  table,
  pageSize,
}: DataTablePaginationProps<TData>) {
  const paginationButtons = [
    {
      icon: ChevronDoubleLeftIcon,
      onClick: () => table.setPageIndex(0),
      disabled: !table.getCanPreviousPage(),
      srText: 'First page',
      mobileView: 'hidden sm:block',
    },
    {
      icon: ChevronLeftIcon,
      onClick: () => table.previousPage(),
      disabled: !table.getCanPreviousPage(),
      srText: 'Previous page',
      mobileView: '',
    },
    {
      icon: ChevronRightIcon,
      onClick: () => table.nextPage(),
      disabled: !table.getCanNextPage(),
      srText: 'Next page',
      mobileView: '',
    },
    {
      icon: ChevronDoubleRightIcon,
      onClick: () => table.setPageIndex(table.getPageCount() - 1),
      disabled: !table.getCanNextPage(),
      srText: 'Last page',
      mobileView: 'hidden sm:block',
    },
  ];

  const totalRows = table.getFilteredRowModel().rows.length;
  const currentPage = table.getState().pagination.pageIndex;
  const firstRowIndex = currentPage * pageSize + 1;
  const lastRowIndex = Math.min(totalRows, firstRowIndex + pageSize - 1);

  return (
    <div className="mt-6 flex items-center justify-between px-8">
      <div className="text-sm text-gray-500 tabular-nums">
        {table.getFilteredSelectedRowModel().rows.length} of {totalRows} row(s)
        selected.
      </div>
      <div className="flex items-center gap-x-6 lg:gap-x-8">
        <p className="hidden text-sm text-gray-500 tabular-nums sm:block">
          Showing{' '}
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {firstRowIndex}-{lastRowIndex}
          </span>{' '}
          of{' '}
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {totalRows}
          </span>
        </p>
        <div className="flex items-center gap-x-1.5">
          {paginationButtons.map((button, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(button.mobileView, 'p-1.5')}
              onClick={() => {
                button.onClick();
                table.resetRowSelection();
              }}
              disabled={button.disabled}
            >
              <span className="sr-only">{button.srText}</span>
              <button.icon className="size-4 shrink-0" aria-hidden="true" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
