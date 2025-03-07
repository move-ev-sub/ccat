import * as TabsPrimtiive from '@radix-ui/react-tabs';
import React from 'react';

export function Tabs({
  ...props
}: React.ComponentProps<typeof TabsPrimtiive.Root>) {
  return <TabsPrimtiive.Root data-slot={'tabs'} {...props} />;
}
