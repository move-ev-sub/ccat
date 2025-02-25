'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import { cn } from '@/utils';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

export function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}
