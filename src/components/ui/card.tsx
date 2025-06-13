import { cn } from '@/lib/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import * as React from 'react';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'border-border-secondary bg-primary-100 dark:bg-primary-800 relative h-fit max-w-xl rounded-xl border shadow-sm',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'bg-background relative z-10 rounded-t-xl p-6 pb-0 shadow-[0px_1px_0px_0px_#ffffff] dark:shadow-[0px_1px_0px_0px_var(--bg-primary-900)]',
        className
      )}
      {...props}
    />
  );
}

const cardTitleVariants = cva(
  'not-first:mt-2.5 text-foreground font-semibold',
  {
    variants: {
      size: {
        md: 'text-base',
        lg: 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

function CardTitle({
  className,
  size,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof cardTitleVariants>) {
  return (
    <div
      data-slot="card-title"
      className={cn(cardTitleVariants({ size }), className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        'text-sm text-zinc-500 not-first:mt-1.5 dark:text-zinc-400',
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        'bg-background outline-border-secondary rounded-xl p-6 outline outline-offset-0 not-first:rounded-t-none',
        className
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'px-6 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-300',
        className
      )}
      {...props}
    />
  );
}

function CardLink({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot={'card-link'}
      className={cn(
        'text-foreground block rounded-md font-medium',
        'focus-indicator',
        className
      )}
      {...props}
    >
      {/**
       * Instead of making the entire card a link, we make the link a span
       * and add a pseudo element to the card. This makes it easier for screen
       * readers to understand the link.
       */}
      <span className="absolute inset-0 z-10" />
      {children}
    </Link>
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardTitle,
};
