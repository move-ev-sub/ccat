import { cn } from '@/lib/utils/cn';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

export const buttonVariants = cva(
  [
    // base
    'rounded-lg font-semibold transition-colors',
    // alignment
    'flex justify-center items-center gap-2 text-center',
    // focus
    'focus-visible:ring-4 focus-visible:outline-none',
    // disabled
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    // icon
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        default: [
          // colors
          'text-white bg-accent-600 [&_svg:not([class*="text-"])]:text-accent-200',
          // borders
          'border border-accent-700',
          // shadows
          'inset-shadow-white/30 inset-shadow-2xs shadow-sm',
          // hover
          'hover:bg-accent-700',
          // focus
          'focus-visible:ring-accent-200 dark:focus-visible:ring-accent-900',
        ],
        outline: [
          [
            // colors
            'text-zinc-700 [&_svg:not([class*="text-"])]:text-zinc-500 dark:text-white dark:[&_svg:not([class*="text-"])]:text-zinc-400',
            // borders
            'border border-zinc-300 dark:border-zinc-700',
            // shadows
            'shadow-xs',
            // hover
            'hover:bg-zinc-50 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
            // focus
            'focus-visible:ring-zinc-100 dark:focus-visible:ring-zinc-800',
          ],
        ],
        ghost: [
          // colors
          'text-zinc-700 [&_svg:not([class*="text-"])]:text-zinc-500 dark:text-white dark:[&_svg:not([class*="text-"])]:text-zinc-400',
          // hover
          'hover:bg-zinc-50 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
          // focus
          'focus-indicator focus-visible:ring-2',
        ],
        destructive: [
          // colors
          'text-white bg-red-600 [&_svg:not([class*="text-"])]:text-red-200',
          // borders
          'border border-red-700',
          // shadows
          'inset-shadow-white/30 inset-shadow-2xs shadow-sm',
          // hover
          'hover:bg-red-700',
          // focus
          'focus-visible:ring-red-200 dark:focus-visible:ring-red-900',
        ],
      },
      size: {
        sm: 'h-8 text-sm px-3.5 py-2 [&_svg:not([class*="size-"])]:size-4',
        md: 'h-10 text-sm px-4 py-2.5 [&_svg:not([class*="size-"])]:size-4',
        lg: 'h-11 text-base px-4.5 py-2.5 [&_svg:not([class*="size-"])]:size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
