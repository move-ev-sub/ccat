'use client';

import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { cn } from '@/utils';

export function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        'focus:bg-background-muted focus:text-foreground data-[state=open]:bg-background-muted data-[state=open]:text-foreground flex items-center rounded-lg px-2 py-1 text-sm font-medium outline-hidden select-none',
        className
      )}
      {...props}
    />
  );
}
