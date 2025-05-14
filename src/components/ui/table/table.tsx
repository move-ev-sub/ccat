import { cn } from '@/lib/utils/cn';
import React from 'react';

export function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <table
      data-slot="table"
      className={cn(
        // base
        'w-full caption-bottom',
        // border color
        'border-border',
        className
      )}
      {...props}
    />
  );
}
