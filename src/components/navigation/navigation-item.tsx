import { cn } from '@/utils';
import Link from 'next/link';

export function NavigationItem({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot="navigation-item"
      className={cn(
        'hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background-muted rounded-lg px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className
      )}
      {...props}
    />
  );
}
