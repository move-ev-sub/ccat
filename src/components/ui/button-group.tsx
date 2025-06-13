import { cn } from '@/lib/utils/cn';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

export function ButtonGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot={'button-group'}
      className={cn(
        'flex w-fit items-center justify-start divide-x rounded-lg',
        // borders
        'border border-zinc-300 dark:border-zinc-700',
        // shadows
        'shadow-[inset_0px_-2px_0px_0px_var(--color-zinc-100)] shadow-sm dark:shadow-[inset_0px_-2px_0px_0px_var(--color-zinc-800)]',
        className
      )}
      {...props}
    />
  );
}

export const buttonGroupItemVariants = cva([
  // base
  'font-semibold transition-colors',
  // alignment
  'flex justify-center items-center gap-2 text-center',
  // disabled
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  // icon
  '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  // size
  'h-8 text-sm px-3.5 py-2 [&_svg:not([class*="size-"])]:size-4',
  // colors
  'text-zinc-700 [&_svg:not([class*="text-"])]:text-zinc-500 dark:text-white dark:[&_svg:not([class*="text-"])]:text-zinc-400',
  // borders
  'border-inherit divide-inherit',
  // hover
  'hover:bg-zinc-50 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
  // focus
  'focus-indicator',
  // border radius
  'first:rounded-l-lg last:rounded-r-lg',
]);

interface ButtonGroupItemProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonGroupItemVariants> {
  asChild?: boolean;
}

export function ButtonGroupItem({
  className,
  asChild,

  ...props
}: ButtonGroupItemProps) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      data-slot={'button-group-item'}
      className={cn(buttonGroupItemVariants({}), className)}
      {...props}
    />
  );
}
