import { cn } from '@/utils';
import React from 'react';

export function PageDesc({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="page-description"
      className={cn(
        'text-secondary mt-2 max-w-prose text-base/7 sm:text-sm/6',
        className
      )}
      {...props}
    />
  );
}
