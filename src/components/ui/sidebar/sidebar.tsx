import React from 'react';

export function Sidebar({ ...props }: React.ComponentProps<'aside'>) {
  return (
    <aside
      data-slot="sidebar"
      className="border-border bg-background-muted flex h-full w-64 shrink-0 flex-col border-r [--sidebar-item-padding:0.625rem] [--sidebar-padding:1rem]"
      {...props}
    />
  );
}
