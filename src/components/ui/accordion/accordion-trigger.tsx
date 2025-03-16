'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@/utils';

import { ChevronDownIcon } from '@heroicons/react/24/outline';

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all hover:underline focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
