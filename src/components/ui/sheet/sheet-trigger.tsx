'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

export function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}
