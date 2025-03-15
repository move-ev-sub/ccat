'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
