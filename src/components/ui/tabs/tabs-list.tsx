import { cn } from '@/lib/utils/cn';
import * as TabsPrimtiive from '@radix-ui/react-tabs';
import { cva } from 'class-variance-authority';
import React from 'react';

export const tabsListVariants = cva(
  'border-border flex max-w-full items-center justify-start gap-2.5 overflow-x-auto border-b'
);

export function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimtiive.List>) {
  return (
    <TabsPrimtiive.List
      data-slot={'tabs-list'}
      className={cn(tabsListVariants({ className }), className)}
      style={{
        scrollbarWidth: 'thin',
      }}
      {...props}
    >
      {children}
    </TabsPrimtiive.List>
  );
}
