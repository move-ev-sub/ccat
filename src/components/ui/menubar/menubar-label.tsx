'use client';

import { cn } from '@/lib/utils/cn';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as React from 'react';

export function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        'text-foreground px-2 py-1.5 text-sm font-semibold data-[inset]:pl-8',
        className
      )}
      {...props}
    />
  );
}
