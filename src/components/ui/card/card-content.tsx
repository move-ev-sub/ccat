import { cn } from '@/lib/utils/cn';
import React from 'react';

export function CardContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-content" className={cn('p-6', className)} {...props} />
  );
}
