import { cn } from '@/lib/utils/cn';
import React from 'react';

export function TableRoot({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
    // Activate if table is used in a float environment
    // className="flow-root"
    >
      <div
        // make table scrollable on mobile
        className={cn('w-full overflow-auto whitespace-nowrap', className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
