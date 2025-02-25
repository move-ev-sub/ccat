'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import { cn } from '@/utils';

export function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('px-2 py-1.5 text-xs font-medium', className)}
      {...props}
    />
  );
}
