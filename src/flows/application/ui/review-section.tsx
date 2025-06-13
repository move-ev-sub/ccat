import { cn } from '@/lib/utils/cn';
import React from 'react';

// #region ReviewSection
// =======================================================
export function ReviewSection({
  title,
  children,
  wrapperClassName,
  ...props
}: Omit<React.ComponentProps<'section'>, 'id'> & {
  id: string;
  title: string;
  wrapperClassName?: string;
}) {
  const id = React.useId();

  return (
    <section role="region" aria-labelledby={id} {...props}>
      <h3 id={id} className="text-foreground text-lg font-medium">
        {title}
      </h3>
      <div className={cn('mt-6', wrapperClassName)}>{children}</div>
    </section>
  );
}
