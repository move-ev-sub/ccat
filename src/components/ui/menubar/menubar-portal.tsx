'use client';

import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';

export function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}
