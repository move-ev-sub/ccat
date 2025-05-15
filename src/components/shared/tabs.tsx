'use client';

import { cn } from '@/lib/utils/cn';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

//#region Tabs
//==================================================
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

//#region TabsList
//==================================================
const tabsListVariants = cva(['flex justify-start items-center w-fit gap-2']);

interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ className }))}
      {...props}
    />
  );
}

//#region TabsTrigger
//==================================================

const tabsTriggerVariants = cva([
  // base
  'text-sm font-semibold text-primary-700 dark:text-primary-200 rounded-lg px-3.5 py-2 [&_svg:not([class*="size-"])]:size-4 h-8',
  // alignment
  'flex justify-center items-center gap-2 text-center',
  // active
  'data-[state=active]:text-foreground data-[state=active]:bg-background-muted',
  // focus
  'focus-indicator',
]);

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ className }))}
      {...props}
    />
  );
}

//#region TabsContent
//==================================================
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
