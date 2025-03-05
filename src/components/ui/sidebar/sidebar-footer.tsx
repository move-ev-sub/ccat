import { cn } from '@/utils';

export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn('mt-auto shrink-0 p-(--sidebar-padding)', className)}
      {...props}
    />
  );
}
