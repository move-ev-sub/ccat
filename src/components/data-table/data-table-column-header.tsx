import { cn } from '@/utils';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/16/solid';
import { Column } from '@tanstack/react-table';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn('whitespace-nowrap', className)}>{title}</div>;
  }

  return (
    <div
      onClick={column.getToggleSortingHandler()}
      className={cn(
        column.columnDef.enableSorting === true &&
          'hover:bg-background -mx-2 inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 whitespace-nowrap select-none'
      )}
    >
      <span>{title}</span>
      {column.getCanSort() ? (
        <>
          <ArrowUpIcon
            className={cn(
              'text-foreground hidden size-4',
              column.getIsSorted() === 'asc' && 'block'
            )}
            aria-hidden="true"
          />
          <ChevronUpDownIcon
            className={cn(
              'hidden size-4',
              column.getIsSorted() === false && 'block'
            )}
            aria-hidden="true"
          />
          <ArrowDownIcon
            className={cn(
              'text-foreground hidden size-4',
              column.getIsSorted() === 'desc' && 'block'
            )}
            aria-hidden="true"
          />
        </>
      ) : null}
    </div>
  );
}
