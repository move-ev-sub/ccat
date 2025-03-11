import { cn } from '@/utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import React from 'react';

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground text-lg font-medium', className)}
      {...props}
    />
  );
}
