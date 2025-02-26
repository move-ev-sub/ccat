import { cn } from '@/utils';
import React from 'react';

export function PageTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="page-title"
      className={cn(
        'text-foreground w-fit items-center justify-start text-2xl font-medium sm:text-xl',
        className
      )}
      {...props}
    />
  );
}
