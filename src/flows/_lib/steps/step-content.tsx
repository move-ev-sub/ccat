'use client';

import { Separator } from '@/components/ui/separator';
import { StepHeader } from '@/flows/_lib/steps/step-header';
import { TabsContent } from '@radix-ui/react-tabs';
import React from 'react';

// #region StepContent
// =============================================================
export function StepContent({
  children,
  ...props
}: React.ComponentProps<typeof TabsContent>) {
  return (
    <TabsContent {...props} tabIndex={0}>
      <StepHeader />
      <Separator className="my-12" />
      <section className="mx-auto max-w-[var(--max-content-width)] px-8">
        {children}
      </section>
    </TabsContent>
  );
}
