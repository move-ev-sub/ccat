'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

export function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}
