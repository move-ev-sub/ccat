'use client';

import { cn } from '@/utils';
import { useFormField } from './form.context';

export function FormMessage({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive-foreground text-sm', className)}
      {...props}
    >
      {body}
    </p>
  );
}
