'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
