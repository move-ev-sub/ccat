'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/utils';
import { useFormField } from './form.context';

export function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}
