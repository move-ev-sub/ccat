import * as React from 'react';

import { cn } from '@/lib/utils/cn';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';

export function Navbar({
  className,
  breadcrumbs,
  ...props
}: React.ComponentProps<'div'> & {
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
}) {
  return (
    <nav
      data-slot={'navbar'}
      className={cn(
        'border-border flex h-12 items-center justify-start gap-6 border-b px-8 py-2',
        className
      )}
      {...props}
    >
      <SidebarTrigger />
      <Separator orientation="vertical" className="!h-6" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.slice(0, -1).map((crumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {crumb.href ? (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}

          <BreadcrumbPage>
            {breadcrumbs[breadcrumbs.length - 1].label}
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
