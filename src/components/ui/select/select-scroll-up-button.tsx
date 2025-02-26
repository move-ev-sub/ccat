'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import { cn } from '@/utils';
import { ChevronUpIcon } from '@heroicons/react/16/solid';

export function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}
