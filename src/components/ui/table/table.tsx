import { cn } from '@/utils';
import React from 'react';

export function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <table
      data-slot="table"
      className={cn(
        // base
        'w-full caption-bottom border-b',
        // border color
        'border-gray-200 dark:border-gray-800',
        className
      )}
      {...props}
    />
  );
}
