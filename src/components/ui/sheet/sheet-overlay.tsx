'use client';

import { cn } from '@/lib/utils/cn';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

export function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn('fixed inset-0 z-50 bg-black/40', className)}
      {...props}
    />
  );
}
