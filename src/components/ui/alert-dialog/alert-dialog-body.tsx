'use client';

import * as React from 'react';

import { cn } from '@/utils';

export function AlertDialogBody({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-body"
      className={cn('flex flex-col gap-2 text-left', className)}
      {...props}
    />
  );
}
