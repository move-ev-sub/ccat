'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

export function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}
