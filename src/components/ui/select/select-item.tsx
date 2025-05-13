'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import { cn } from '@/lib/utils/cn';
import { CheckIcon } from '@heroicons/react/16/solid';

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // base
        "[&_svg:not([class*='text-'])]:text-secondary relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm font-medium outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:[&_svg:not([class*='text-'])]:text-white *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        // disabled
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        // focus
        "focus:bg-background-muted focus:text-foreground focus:[&_svg:not([class*='text-'])]:text-secondary",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
