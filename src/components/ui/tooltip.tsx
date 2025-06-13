'use client';

import { cn } from '@/lib/utils/cn';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-primary-900 z-50 w-fit max-w-sm origin-(--radix-tooltip-content-transform-origin) rounded-lg p-3 text-xs text-balance shadow-2xl',
          // animation
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary-900 fill-primary-900 z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

function TooltipTitle({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="tooltip-title"
      className={cn(
        'block text-start text-xs font-semibold text-white',
        className
      )}
      {...props}
    />
  );
}

function TooltipDescription({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="tooltip-title"
      className={cn(
        'mt-1.25 block text-start text-xs font-medium text-zinc-400',
        className
      )}
      {...props}
    />
  );
}

export {
  Tooltip,
  TooltipContent,
  TooltipDescription,
  TooltipProvider,
  TooltipTitle,
  TooltipTrigger,
};
