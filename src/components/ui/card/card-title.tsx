import { cn } from '@/lib/utils/cn';
import React from 'react';

export function CardTitle({ className, ...props }: React.ComponentProps<'h4'>) {
  return (
    <h4
      data-slot={'card-title'}
      className={cn('text-foreground block rounded-md font-medium', className)}
      {...props}
    />
  );
}
