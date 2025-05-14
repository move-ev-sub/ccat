import { cn } from '@/lib/utils/cn';
import React from 'react';

export function TableHead({
  className,
  ...props
}: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-head"
      className={cn('bg-background-muted', className)}
      {...props}
    />
  );
}
