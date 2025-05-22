import { cn } from '@/lib/utils/cn';
import React from 'react';

export function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        // base
        'p-4 text-sm',
        // text color
        'text-muted-background',
        className
      )}
      {...props}
    />
  );
}
