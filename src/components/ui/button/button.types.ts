import { cva, VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  // base
  'text-sm font-semibold rounded-lg transition-colors cursor-pointer ' +
    // alignment
    'flex items-center justify-center gap-2.5 ' +
    // focus
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-offset-2 focus-visible:outline-hidden ' +
    // disabled
    'disabled:opacity-50 disabled:pointer-events-none ' +
    // svg
    '[&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-foreground text-background border border-primary-950 dark:border-primary-100 shadow-[inset_0px_2px_0px_rgba(255,255,255,0.25)] dark:shadow-[inset_0px_2px_0px_rgba(0,0,0,0.15)] hover:bg-foreground/90',
        accent:
          'bg-accent text-white border border-accent-600 shadow-[inset_0px_2px_0px_rgba(255,255,255,0.25)] hover:bg-accent-600 shadow-sm shadow-accent/40',
        outline:
          'border border-border bg-background hover:bg-background-muted [&_svg]:text-accent',
        ghost: 'hover:bg-background-muted [&_svg]:fill-accent',
        success:
          'bg-success-background border-success-border border text-success-foreground hover:bg-success-background/90 shadow-sm shadow-success/40 focus-visible:ring-success',
        destructive:
          'bg-destructive-background border-destructive-border border text-destructive-foreground hover:bg-destructive-background/90 shadow-sm shadow-destructive/40 focus-visible:ring-destructive',
        warning:
          'bg-warning-background border-warning-border border text-warning-foreground hover:bg-warning-background/90 shadow-sm shadow-warning/40 focus-visible:ring-warning',
      },
      size: {
        default: 'text-sm px-3 py-1.5 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      keyof VariantProps<typeof buttonVariants>
    >,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
