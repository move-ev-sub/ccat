import { cn } from '@/utils';
import React from 'react';

export function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        // base
        'mt-3 px-3 text-center text-sm',
        // text color
        'text-secondary',
        className
      )}
      {...props}
    />
  );
}
