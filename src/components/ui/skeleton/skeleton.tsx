import { cn } from '@/lib/utils/cn';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      role="status"
      aria-busy="true"
      className={cn('bg-foreground/10 animate-pulse rounded-lg', className)}
      {...props}
    />
  );
}

export { Skeleton };
