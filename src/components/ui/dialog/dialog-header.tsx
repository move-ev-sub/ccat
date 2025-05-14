'use client';

import { cn } from '@/lib/utils/cn';
import * as React from 'react';

export function DialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        'text-foreground flex flex-col gap-2 text-center sm:text-left',
        className
      )}
      {...props}
    />
  );
}
