'use client';

import { cn } from '@/utils';
import { useFormField } from './form.context';

export function FormDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-secondary text-sm', className)}
      {...props}
    />
  );
}
