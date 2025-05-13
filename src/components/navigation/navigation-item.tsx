import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

export function NavigationItem({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot="navigation-item"
      className={cn(
        'text-foreground hover:bg-background rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
        'focus-indicator focus-visible:ring-offset-background-muted',
        className
      )}
      {...props}
    />
  );
}
