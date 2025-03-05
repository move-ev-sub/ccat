'use client';

import React from 'react';

interface SidebarNavContextProps {
  base?: string;
}

const SidebarNavContext = React.createContext<SidebarNavContextProps>(
  {} as SidebarNavContextProps
);

export function useSidebarNavContext() {
  const context = React.useContext(SidebarNavContext);

  if (!context) {
    throw new Error(
      'useSidebarNavContext must be used within a SidebarNavProvider'
    );
  }

  return { base: context.base };
}

export function SidebarNavProvider({
  value,
  children,
}: React.ComponentProps<typeof SidebarNavContext.Provider>) {
  return (
    <SidebarNavContext.Provider value={value}>
      {children}
    </SidebarNavContext.Provider>
  );
}
