import { cn } from '@/utils';

export function PageHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div data-slot="page-header" className={cn('', className)} {...props} />
  );
}
