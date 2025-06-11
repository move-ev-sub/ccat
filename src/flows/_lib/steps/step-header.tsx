'use client';

import { PageDesc, PageTitle } from '@/components/page-header';
import { useStepsContext } from '@/flows/_lib/steps/steps.context';
import { cn } from '@/lib/utils/cn';
import React from 'react';

// #region StepHeader
// =============================================================
export function StepHeader({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  const { getCurrentStep } = useStepsContext();

  const step = getCurrentStep();

  if (!step) {
    return <p>The Step Header could not be rendered.</p>;
  }

  return (
    <header
      data-slot="step-header"
      className={cn('mx-auto max-w-[var(--max-content-width)] px-8', className)}
      {...props}
    >
      <PageTitle>{step.label}</PageTitle>
      <PageDesc>{step.description}</PageDesc>
    </header>
  );
}
