import { cn } from '@/utils';
import React from 'react';

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'bg-background-muted text-muted-foreground border-border flex items-center justify-start gap-2.5 rounded-b-md border-t px-6 py-2 text-xs',
        className
      )}
      {...props}
    />
  );
}
