import { cn } from '@/utils';
import * as TabsPrimtiive from '@radix-ui/react-tabs';
import React from 'react';

export function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimtiive.Content>) {
  return (
    <TabsPrimtiive.Content
      data-slot={'tabs-content'}
      className={cn('outline-none', className)}
      {...props}
    />
  );
}
