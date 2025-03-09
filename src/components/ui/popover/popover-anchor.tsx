'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

export function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}
