'use client';

import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { cn } from '@/utils';

export function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        'bg-background text-foreground z-50 min-w-[8rem] overflow-hidden rounded-xl border p-1 shadow-lg',
        className
      )}
      {...props}
    />
  );
}
