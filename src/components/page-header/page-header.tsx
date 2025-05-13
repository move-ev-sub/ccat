import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/cn';

export function PageHeader({
  className,
  children,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="page-header"
      className={cn('container', className)}
      {...props}
    >
      {children}
      <Separator className="mt-6 sm:mt-4" orientation="horizontal" />
    </header>
  );
}
