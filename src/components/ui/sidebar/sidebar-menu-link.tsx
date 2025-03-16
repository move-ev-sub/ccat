'use client';

import { cn } from '@/utils';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { sidebarMenuButtonVariants } from './sidebar-menu-button';
import { useSidebarMenuContext } from './sidebar-menu.context';
import { useSidebar } from './sidebar.context';

export function SidebarMenuLink({
  asChild = false,
  variant = 'default',
  size = 'default',
  tooltip,
  href,
  className,
  ...props
}: React.ComponentProps<typeof Link> & {
  asChild?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : Link;
  const { isMobile, state, setOpenMobile } = useSidebar();
  const { base, pathname } = useSidebarMenuContext();

  const actualHref = base ? (base + href).toString() : href;

  const active: boolean = React.useMemo(() => {
    if (href == '/') {
      return pathname + '/' == actualHref.toString();
    } else {
      return pathname.startsWith(actualHref.toString());
    }
  }, [actualHref, href, pathname]);

  const button = (
    <Comp
      data-slot="sidebar-menu-link"
      data-sidebar="menu-link"
      data-size={size}
      data-active={active}
      href={actualHref}
      onClick={() => setOpenMobile(false)}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}
