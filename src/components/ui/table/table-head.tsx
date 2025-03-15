import { cn } from '@/utils';
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
