import { cn } from '@/utils';
import React from 'react';

export function PageDesc({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="page-description"
      className={cn(
        'text-secondary mt-4 max-w-prose sm:mt-2 sm:text-sm',
        className
      )}
      {...props}
    />
  );
}
