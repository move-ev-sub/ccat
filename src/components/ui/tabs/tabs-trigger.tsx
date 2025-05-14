import { cn } from '@/lib/utils/cn';
import * as TabsPrimtiive from '@radix-ui/react-tabs';
import { cva } from 'class-variance-authority';
import React from 'react';

export const tabsTriggerVariants = cva(
  cn(
    // base
    'z-50 flex cursor-pointer items-center justify-center gap-2.5 border-b-2 border-transparent px-3 py-2 text-sm font-medium whitespace-nowrap transition-all [&_svg]:size-4',
    // text color
    'text-foreground',
    // hover
    'hover:text-secondary',
    // selected
    'data-[state=active]:border-accent data-[state=active]:text-accent',
    // disabled
    'data-[disabled]:pointer-events-none'
  )
);

export function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimtiive.Trigger>) {
  return (
    <TabsPrimtiive.Trigger
      data-slot={'tabs-trigger'}
      className={cn(tabsTriggerVariants({}), className)}
      {...props}
    >
      {children}
    </TabsPrimtiive.Trigger>
  );
}
