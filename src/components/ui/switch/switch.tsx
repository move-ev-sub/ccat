'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/utils';

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        'peer border-border-secondary bg-background-muted data-[state=checked]:bg-accent data-[state=checked]:border-accent focus-indicator w-[2.375rem] rounded-full border p-0.5 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'bg-foreground pointer-events-none block h-4 w-4 rounded-full ring-0 shadow-lg transition-all data-[state=checked]:translate-x-4 data-[state=checked]:bg-white data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  );
}
