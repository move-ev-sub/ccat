import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const pingerVariants = cva('rounded-full ring-2 ring-background relative', {
  variants: {
    variant: {
      success: 'bg-success [&_div]:bg-success',
    },
    size: {
      sm: 'size-2 [&_div]:size-2',
      md: 'size-3 [&_div]:size-3',
    },
  },
  defaultVariants: {
    variant: 'success',
    size: 'sm',
  },
});

export function Pinger({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof pingerVariants>) {
  return (
    <div
      data-slot={'pinger'}
      className={cn(pingerVariants({ variant, size, className }))}
      {...props}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform animate-ping rounded-full" />
    </div>
  );
}
