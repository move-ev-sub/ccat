import { cva, VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'flex h-[1.375rem] w-fit items-center justify-center gap-1.5 rounded-md border border-dashed px-1 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'borderzin-300 bg-zin-100 text-zin-800',
        warn: 'border-amber-300 bg-amber-100 text-amber-800',
        error: 'border-red-300 bg-red-100 text-red-800',
        success: 'border-green-300 bg-green-100 text-green-800',
      },
    },
  }
);

export interface BadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {}
