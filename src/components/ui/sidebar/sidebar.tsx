'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { Bars3Icon } from '@heroicons/react/24/outline';
import React from 'react';
import { Sheet, SheetContent, SheetPortal, SheetTrigger } from '../sheet';
import { SidebarProvider } from './sidebar-context';

export function Sidebar({ children, ...props }: React.ComponentProps<'aside'>) {
  const [open, setIsOpen] = React.useState(false);

  const mobile = useIsMobile();

  return (
    <SidebarProvider value={{ mobile }}>
      {mobile ? (
        <div className="border-border w-full px-8 py-2 pl-6">
          <Sheet open={open} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="focus-visible:ring-ring focus-visible:ring-offset-background active:bg-background-muted rounded-lg p-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
                <Bars3Icon className="size-6" />
              </button>
            </SheetTrigger>
            <SheetPortal>
              <SheetContent
                sheetTitle="Menu"
                side="left"
                className="[--sidebar-item-padding:0.625rem] [--sidebar-padding:1rem]"
              >
                {children}
              </SheetContent>
            </SheetPortal>
          </Sheet>
        </div>
      ) : (
        <aside
          data-slot="sidebar"
          className="border-border bg-background-muted flex h-full w-64 shrink-0 flex-col border-r [--sidebar-item-padding:0.625rem] [--sidebar-padding:1rem]"
          {...props}
        >
          {children}
        </aside>
      )}
    </SidebarProvider>
  );
}
