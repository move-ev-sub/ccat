import { cn } from '@/lib/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

export const inputVariants = cva([
  'rounded-lg border-border-input border text-sm font-medium text-foreground placeholder:text-secondary h-9 flex justify-start items-center px-3.5 py-2 transition-colors max-w-full',
  'shadow-sm',
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring',
  'aria-invalid:ring-4 aria-invalid:ring-red-100 aria-invalid:border-red-400',
  'disabled:bg-background-muted disabled:placeholder:text-primary-400 disabled:pointer-events-none disabled:cursor-not-allowed dark:disabled:placeholder:text-primary-700',
]);

interface InputProps
  extends React.ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      className={cn(inputVariants(), className)}
      {...props}
    />
  );
}
