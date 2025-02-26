'use client';

import { cn } from '@/utils';
import { XMarkIcon } from '@heroicons/react/16/solid';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import * as React from 'react';
import { SheetOverlay } from './sheet-overlay';
import { SheetPortal } from './sheet-portal';

export function SheetContent({
  className,
  children,
  side = 'right',
  sheetTitle,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
  sheetTitle: string;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'bg-background fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out',
          side === 'right' &&
            'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' &&
            'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' && 'inset-x-0 top-0 h-auto border-b',
          side === 'bottom' && 'inset-x-0 bottom-0 h-auto border-t',
          className
        )}
        {...props}
      >
        <VisuallyHidden asChild>
          <SheetPrimitive.Title>{sheetTitle}</SheetPrimitive.Title>
        </VisuallyHidden>
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-[1.625rem] rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XMarkIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}
