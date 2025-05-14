import { cn } from '@/lib/utils/cn';
import React from 'react';

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        'border-border bg-background-muted border-b p-6',
        className
      )}
      {...props}
    />
  );
}
