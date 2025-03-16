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
        'focus-visible:ring-ring focus-visible:ring-offset-background-muted text-foreground hover:bg-background rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className
      )}
      {...props}
    />
  );
}
