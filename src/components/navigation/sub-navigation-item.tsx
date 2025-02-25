import { cn } from '@/utils';
import Link from 'next/link';

export function SubNavigationItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot={'sub-navigation-item'}
      className={cn(
        'text-foreground active:bg-background-muted data-[active=true]:text-accent data-[active=true]:bg-accent-50 dark:data-[active=true]:bg-accent-950 group relative w-fit px-3 py-4 font-medium sm:py-2.5 sm:text-sm',
        className
      )}
      {...props}
    >
      {children}
      <div className="bg-accent absolute bottom-0 left-0 hidden h-0.5 w-full group-data-[active=true]:block" />
    </Link>
  );
}
