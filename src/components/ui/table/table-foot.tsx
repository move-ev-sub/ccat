import { cn } from '@/lib/utils/cn';
import React from 'react';

export function TableFoot({
  className,
  ...props
}: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-foot"
      className={cn(
        // base
        'border-t text-left font-medium',
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
