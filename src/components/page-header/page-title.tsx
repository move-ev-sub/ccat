import { cn } from '@/lib/utils/cn';
import React from 'react';

export function PageTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="page-title"
      className={cn(
        'text-foreground text-2xl font-medium sm:text-xl',
        className
      )}
      {...props}
    />
  );
}
