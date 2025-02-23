import * as React from 'react';

import { cn } from '@/utils';
import { ExclamationTriangleIcon } from '@heroicons/react/16/solid';

interface FormErrorProps extends React.ComponentProps<'div'> {
  message?: string;
  visible: boolean;
}

export function FormError({
  className,
  message = 'Ein unerwarteter Fehler ist aufgetreten.',
  visible = false,
  ...props
}: FormErrorProps) {
  return (
    <div
      data-slot="form-error"
      data-visible={visible}
      className={cn(
        'hidden items-start justify-start gap-1.5 data-[visible=true]:flex',
        className
      )}
      {...props}
    >
      <ExclamationTriangleIcon className="text-destructive mt-0.5 size-4 shrink-0" />
      <div className="text-sm">
        <p className="text-destructive font-medium">{message}</p>
      </div>
    </div>
  );
}
