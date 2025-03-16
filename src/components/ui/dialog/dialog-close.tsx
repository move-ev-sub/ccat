'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
