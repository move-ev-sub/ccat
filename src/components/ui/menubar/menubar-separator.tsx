'use client';

import { cn } from '@/lib/utils/cn';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as React from 'react';

export function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}
