import { cn } from '@/lib/utils/cn';
import React from 'react';

export function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <table
      data-slot="table"
      className={cn(
        // base
        'w-full caption-bottom',
        // border color
        'border-border',
        className
      )}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        // base
        'divide-y',
        // divide color
        'divide-border-secondary',
        className
      )}
      {...props}
    />
  );
}

export function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        // base
        'mt-3 px-3 text-center text-sm',
        // text color
        'text-secondary',
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        // base
        'px-6 py-4 text-sm',
        // text color
        'text-zinc-600',
        className
      )}
      {...props}
    />
  );
}
export function TableFoot({
  className,
  ...props
}: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-foot"
      className={cn(
        // base
        'border-t text-left font-medium',
        // text color
        'text-foreground',
        // border color
        'border-border',
        className
      )}
      {...props}
    />
  );
}

export function TableHead({
  className,
  ...props
}: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-head"
      className={cn('bg-background-muted', className)}
      {...props}
    />
  );
}

export function TableHeaderCell({
  className,
  ...props
}: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-header-cell"
      className={cn(
        // base
        'border-b px-6 py-4 text-left text-sm font-semibold',
        // text color
        'text-foreground',
        // border color
        'border-border',
        className
      )}
      {...props}
    />
  );
}

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

export function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        '[&_td:last-child]:pr-4 [&_th:last-child]:pr-4',
        '[&_td:first-child]:pl-4 [&_th:first-child]:pl-4',
        'hover:bg-background-muted/80',
        className
      )}
      {...props}
    />
  );
}
