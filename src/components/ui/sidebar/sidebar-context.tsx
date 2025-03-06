import React from 'react';

interface SidebarContextProps {
  mobile?: boolean;
}

const SidebarContext = React.createContext<SidebarContextProps>(
  {} as SidebarContextProps
);

export function useSidebarContext() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }

  return { mobile: context.mobile };
}

export function SidebarProvider({
  children,
  value,
}: React.ComponentProps<typeof SidebarContext.Provider>) {
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
