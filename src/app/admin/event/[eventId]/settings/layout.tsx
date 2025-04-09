import { PageContainer } from '@/components/page-container';
import { PageHeader, PageTitle } from '@/components/page-header';
import { cn } from '@/utils';
import {
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  ClockIcon,
  LockClosedIcon,
} from '@heroicons/react/16/solid';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import React from 'react';

export default async function AdminEventSettingsLayout({
  children,
  phases,
  slots,
  security,
}: {
  children: React.ReactNode;
  phases: React.ReactNode;
  slots: React.ReactNode;
  security: React.ReactNode;
}) {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Einstellungen</PageTitle>
      </PageHeader>
      <section className="mt-to-header container">
        <TabsPrimitive.Tabs
          className="grid gap-8 lg:grid-cols-4"
          orientation="vertical"
          defaultValue="general"
        >
          <TabsPrimitive.List className="space-y-4 pr-8">
            <TabsTrigger value="general">
              <AdjustmentsHorizontalIcon />
              Allgemein
            </TabsTrigger>
            <TabsTrigger value="security">
              <LockClosedIcon />
              Sicherheit
            </TabsTrigger>
            <TabsTrigger value="phases">
              <CalendarIcon />
              Phasen
            </TabsTrigger>
            <TabsTrigger value="slots">
              <ClockIcon />
              Slots
            </TabsTrigger>
          </TabsPrimitive.List>
          <div className="col-span-3">
            <TabsPrimitive.Content value="general" asChild>
              {children}
            </TabsPrimitive.Content>
            <TabsPrimitive.Content value="security" asChild>
              {security}
            </TabsPrimitive.Content>
            <TabsPrimitive.Content value="phases" asChild>
              {phases}
            </TabsPrimitive.Content>
            <TabsPrimitive.Content value="slots" asChild>
              {slots}
            </TabsPrimitive.Content>
          </div>
        </TabsPrimitive.Tabs>
      </section>
    </PageContainer>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        // base
        'text-foreground flex w-full items-center justify-start gap-2.5 rounded-md text-base font-medium transition-colors sm:text-sm [&_svg]:size-4 [&_svg]:shrink-0',
        // active
        'data-[state=active]:text-accent hover:data-[state=active]:text-accent/80',
        // focus
        'focus-indicator',
        className
      )}
      {...props}
    />
  );
}
