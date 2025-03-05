import { cn } from '@/utils';

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        'flex-grow overflow-y-auto p-(--sidebar-padding)',
        className
      )}
      {...props}
    />
  );
}
