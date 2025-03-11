import { cn } from '@/utils';
import React from 'react';

export function TableBody({
  className,
  ...props
}: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        // base
        'divide-y',
        // divide color
        'divide-border',
        className
      )}
      {...props}
    />
  );
}
