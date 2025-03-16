'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

interface SidebarMenuContextProps {
  pathname: string;
  base?: string;
}

const SidebarMenuContext = React.createContext<SidebarMenuContextProps>(
  {} as SidebarMenuContextProps
);

export function useSidebarMenuContext() {
  const context = React.useContext(SidebarMenuContext);

  if (!context) {
    throw new Error(
      'useSidebarMenuContext must be used within a SidebarMenuProvider'
    );
  }

  return context;
}

export function SidebarMenuProvider({
  base,
  children,
}: Omit<React.ComponentProps<typeof SidebarMenuContext.Provider>, 'value'> & {
  base?: string;
}) {
  const pathname = usePathname();

  return (
    <SidebarMenuContext.Provider
      value={{
        pathname,
        base,
      }}
    >
      {children}
    </SidebarMenuContext.Provider>
  );
}
