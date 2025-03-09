'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

export function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}
