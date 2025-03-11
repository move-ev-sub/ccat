'use client';

import { cn } from '@/utils';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { Button } from '../button';
import { useSidebar } from './sidebar.context';

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      className={cn('h-7 w-7', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <Bars3Icon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
