import { cn } from '@/utils';

/**
 * A Page Container can be used to wrap the main content of a page. It provides a consistent
 * layout for the content.
 *
 * TODO: Add spacing to elemtents inside the container
 */
export function PageContainer({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot={'page-container'}
      className={cn('container py-10 sm:py-12', className)}
      {...props}
    />
  );
}
