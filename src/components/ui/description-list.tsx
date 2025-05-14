/**
 * The description list component is used to display a list of terms and descriptions.
 * It is a wrapper around the `dl` element and the `dt` and `dd` elements.
 *
 * @see https://www.w3schools.com/tags/tag_dl.asp
 * @see https://tailwindcss.com/plus/ui-blocks/application-ui/data-display/description-lists#component-d9372707af2e94e67936e94d7339cbb3
 */
import { cn } from '@/lib/utils/cn';
import React from 'react';

export function DescriptionList({
  className,
  ...props
}: React.ComponentProps<'dl'>) {
  return (
    <dl
      data-slot="description-list"
      className={cn('divide-border divide-y', className)}
      {...props}
    />
  );
}

export function DescriptionListRow({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="description-list-row"
      className={cn(
        'py-6 first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-4',
        className
      )}
      {...props}
    />
  );
}

export function DescriptionListTerm({
  className,
  ...props
}: React.ComponentProps<'dt'>) {
  return (
    <dt
      data-slot="description-list-term"
      className={cn('text-foreground text-sm/6 font-medium', className)}
      {...props}
    />
  );
}

export function DescriptionListDescription({
  className,
  ...props
}: React.ComponentProps<'dd'>) {
  return (
    <dd
      data-slot="description-list-description"
      className={cn(
        'text-secondary mt-1 text-sm/6 sm:col-span-2 sm:mt-0',
        className
      )}
      {...props}
    />
  );
}
