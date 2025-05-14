import { cn } from '@/lib/utils/cn';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';

export function Card({
  className,
  asChild,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean;
}) {
  const Component = asChild ? Slot : 'div';

  return (
    <Component
      data-slot="card"
      className={cn(
        'bg-background border-border relative rounded-md border shadow-xs',
        className
      )}
      {...props}
    />
  );
}
