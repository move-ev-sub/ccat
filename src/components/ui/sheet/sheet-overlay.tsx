'use client';

import { cn } from '@/utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

export function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn('fixed inset-0 z-50 bg-black/80', className)}
      {...props}
    />
  );
}
