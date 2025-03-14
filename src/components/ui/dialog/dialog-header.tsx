'use client';

import * as React from 'react';
import { cn } from '@/utils';

export function DialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        'text-foreground flex flex-col gap-2 sm:text-left',
        className
      )}
      {...props}
    />
  );
}
