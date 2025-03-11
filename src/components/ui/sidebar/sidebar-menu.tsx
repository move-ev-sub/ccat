import { cn } from '@/utils';
import { SidebarMenuProvider } from './sidebar-menu.context';

export function SidebarMenu({
  className,
  base,
  ...props
}: React.ComponentProps<'ul'> & {
  base?: string;
}) {
  return (
    <SidebarMenuProvider base={base}>
      <ul
        data-slot="sidebar-menu"
        data-sidebar="menu"
        className={cn('flex w-full min-w-0 flex-col gap-1', className)}
        {...props}
      />
    </SidebarMenuProvider>
  );
}
