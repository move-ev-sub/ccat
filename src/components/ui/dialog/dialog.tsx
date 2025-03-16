'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
