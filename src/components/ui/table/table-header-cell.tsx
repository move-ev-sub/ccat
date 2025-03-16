import { cn } from '@/utils';
import React from 'react';

export function TableHeaderCell({
  className,
  ...props
}: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-header-cell"
      className={cn(
        // base
        'border-b px-4 py-3.5 text-left text-sm font-semibold',
        // text color
        'text-foreground',
        // border color
        'border-border',
        className
      )}
      {...props}
    />
  );
}
