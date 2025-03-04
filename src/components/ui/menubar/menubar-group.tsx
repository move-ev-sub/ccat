'use client';

import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';

export function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}
