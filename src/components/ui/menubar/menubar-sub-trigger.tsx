'use client';

import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { cn } from '@/utils';

export function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        'focus:bg-background-muted focus:text-foreground data-[state=open]:bg-background-muted data-[state=open]:text-foreground flex cursor-default items-center rounded-lg px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </MenubarPrimitive.SubTrigger>
  );
}
