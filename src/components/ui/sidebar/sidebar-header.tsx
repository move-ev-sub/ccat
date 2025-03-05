import { cn } from '@/utils';

export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn('shrink-0 p-(--sidebar-padding)', className)}
      {...props}
    />
  );
}
