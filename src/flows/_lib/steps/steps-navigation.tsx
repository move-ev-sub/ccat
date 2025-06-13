'use client';

import { Button } from '@/components/ui/button';
import { useStepsContext } from '@/flows/_lib/steps/steps.context';
import { cn } from '@/lib/utils/cn';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import React from 'react';

// #region StepsNavigation
// =============================================================
export function StepsNavigation({
  className,
  ...props
}: React.ComponentProps<'footer'>) {
  return (
    <footer
      data-slot="step-navigation"
      className={cn(
        'mx-auto flex max-w-[var(--max-content-width)] items-center justify-between gap-4',
        className
      )}
      {...props}
    />
  );
}

// #region BackButton
// =============================================================
export function BackButton({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { goBack, canGoBack } = useStepsContext();

  return (
    <Button
      disabled={!canGoBack() || disabled}
      onClick={goBack}
      variant="outline"
      className={cn(className)}
      {...props}
    >
      <ChevronLeftIcon /> Zurück
    </Button>
  );
}

// #region ForwardButton
// =============================================================
export function ForwardButton({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { goForward, canGoForward } = useStepsContext();

  return (
    <Button
      disabled={!canGoForward() || disabled}
      onClick={goForward}
      variant="outline"
      className={cn(className)}
      {...props}
    >
      Weiter <ChevronRightIcon />
    </Button>
  );
}
