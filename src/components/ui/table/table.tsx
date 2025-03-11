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

export function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        // base
        'mt-3 px-3 text-center text-sm',
        // text color
        'text-gray-500 dark:text-gray-500',
        className
      )}
      {...props}
    />
  );
}
