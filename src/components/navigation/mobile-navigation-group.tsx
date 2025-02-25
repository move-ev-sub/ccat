import { cn } from '@/utils';
import React from 'react';

export function MobileNavigationGroup({
  className,
  label,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  label?: string;
}) {
  return (
    <div data-slot="navigation-group" className={cn('', className)} {...props}>
      <div className="flex items-center justify-start gap-2.5 px-2.5">
        {label && (
          <span className="text-foreground block shrink-0 text-xs font-medium">
            {label}
          </span>
        )}
        <div className="bg-border h-px w-full" role="separator" />
      </div>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  );
}
