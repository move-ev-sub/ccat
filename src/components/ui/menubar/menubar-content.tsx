'use client';

import { cn } from '@/lib/utils/cn';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as React from 'react';

export function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPrimitive.MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'bg-background text-foreground z-50 min-w-[12rem] overflow-hidden rounded-xl border p-1 shadow-md',
          className
        )}
        {...props}
      />
    </MenubarPrimitive.MenubarPortal>
  );
}
