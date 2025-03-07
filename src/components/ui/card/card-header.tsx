import { cn } from '@/utils';
import React from 'react';

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'bg-background-muted text-foreground border-border rounded-t-md border-b px-6 py-4',
        className
      )}
      {...props}
    />
  );
}
