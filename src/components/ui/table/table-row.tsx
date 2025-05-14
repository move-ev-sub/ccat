import { cn } from '@/lib/utils/cn';
import React from 'react';

export function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        '[&_td:last-child]:pr-4 [&_th:last-child]:pr-4',
        '[&_td:first-child]:pl-4 [&_th:first-child]:pl-4',
        'hover:bg-background-muted/80',
        className
      )}
      {...props}
    />
  );
}
