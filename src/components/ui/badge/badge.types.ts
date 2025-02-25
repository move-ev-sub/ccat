import { cva, VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'flex h-7 sm:h-[1.375rem] w-fit items-center justify-center gap-1.5 rounded-md border border-dashed px-2 py-1.5 sm:px-1 sm:py-0.5 text-sm sm:text-xs font-medium [&_svg]:size-4',
  {
    variants: {
      variant: {
        default: 'border-border-secondary bg-background-muted text-foreground ',
        warn: 'border-amber-300 bg-amber-100 text-amber-800 dark:text-amber-50 dark:bg-amber-950 dark:border-amber-700',
        error:
          'border-red-300 bg-red-100 text-red-800 dark:text-red-50 dark:bg-red-950 dark:border-red-700',
        success:
          'border-green-300 bg-green-100 text-green-800 dark:text-green-50 dark:bg-green-950 dark:border-green-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {}
