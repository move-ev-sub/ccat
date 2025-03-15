'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/utils';

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-secondary text-sm', className)}
      {...props}
    />
  );
}
