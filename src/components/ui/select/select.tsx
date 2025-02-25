'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

export function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}
