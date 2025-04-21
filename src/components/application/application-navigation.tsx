'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { useStepContext } from './step';

/**
 * Renders a div container for all progress bar items. This is displayed
 * at the top of the application layout and shows the current step of the
 * application process.
 */
export function ProgressBar({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const ctx = useStepContext();
  const currentIndex = ctx.steps.indexOf(ctx.currentStep);

  return (
    <div
      role="progressbar"
      aria-valuenow={currentIndex + 1}
      aria-valuemin={1}
      aria-valuemax={ctx.steps.length}
      data-slot={'progress-bar'}
      className={cn('mt-8 grid grid-cols-1 gap-8 md:grid-cols-4', className)}
      {...props}
    />
  );
}

/**
 * Renders a single progress bar item. This is displayed in the progress bar
 * container and shows the current step of the application process. The item
 * is marked as active if it is the current step or has been completed.
 *
 * If the item is active, the button is clickable and will navigate to
 * the step. If the item is inactive, the button is disabled.
 */
export function ProgressBarItem({
  className,
  value,
  label,
  ...props
}: React.ComponentProps<'div'> & {
  value: string;
  label: string;
}) {
  const ctx = useStepContext();
  const currentIndex = ctx.steps.indexOf(ctx.currentStep);
  const itemIndex = ctx.steps.indexOf(value);

  const active = itemIndex <= currentIndex;

  return (
    <div
      role="listitem"
      aria-current={active ? 'step' : undefined}
      data-slot={'progress-bar-item'}
      data-state={active ? 'active' : 'inactive'}
      className={cn(
        'group border-border relative border-l-[3px] pl-4 md:border-t-[3px] md:border-l-0 md:pt-4 md:pl-0',
        'data-[state=active]:border-accent',
        className
      )}
      {...props}
    >
      <span className="text-secondary group-data-[state=active]:text-accent block text-xs font-medium">
        Schritt {itemIndex + 1}
      </span>
      <button
        aria-label={`Navigate to ${label}`}
        aria-disabled={!active}
        role="button"
        className="text-foreground mt-1 block text-start text-sm font-medium"
        disabled={!active}
        onClick={() => ctx.setCurrentStep(value)}
      >
        <span
          className={cn(
            'absolute inset-0 h-full w-full',
            active && 'cursor-pointer'
          )}
        />
        {label}
      </button>
    </div>
  );
}

/**
 * The back button is used to navigate to the previous step in the
 * funnel. It is automatically disabled if the user is at the first
 * step. This button does not check if the current step is valid or
 * not.
 */
export function BackButton({
  className,
  /**
   * Whether the button is disabled. This should be used to prevent
   * the user from skipping steps.
   */
  disabled,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { canGoBack, previousStep } = useStepContext();

  const isDisabled = disabled || !canGoBack();

  return (
    <Button
      data-slot="back-button"
      role="button"
      aria-label="Go back"
      aria-disabled={isDisabled}
      variant={'outline'}
      className={cn('[&_svg]:text-secondary', className)}
      disabled={isDisabled}
      onClick={previousStep}
      {...props}
    >
      <ChevronLeftIcon />
      Zurück
    </Button>
  );
}

/**
 * The next button is used to navigate to the next step in the
 * funnel. It is automatically disabled if the user is at the last
 * step. This button does not check if the current step is valid or
 * not.
 */
export function NextButton({
  className,
  /**
   * Whether the button is disabled. This should be used to prevent
   * the user from skipping steps.
   */
  disabled,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { canGoForward } = useStepContext();

  const isDisabled = disabled || !canGoForward();

  return (
    <Button
      data-slot="next-button"
      role="button"
      aria-label="Go forward"
      aria-disabled={isDisabled}
      variant={'outline'}
      className={cn('[&_svg]:text-secondary', className)}
      disabled={isDisabled}
      {...props}
    >
      Weiter <ChevronRightIcon />
    </Button>
  );
}

/**
 * Renders a navigation bar with a back button and a next button.
 * The next button is disabled if the current page is not valid.
 */
export function NavigationBar({
  className,
  currentPageValid,
  ...props
}: React.ComponentProps<'nav'> & {
  /**
   * Whether the current page is valid. This is used to determine
   * if the next button should be disabled.`true` if the current
   * page is valid.
   */
  currentPageValid: boolean;
}) {
  return (
    <nav
      data-slot="navigation-bar"
      className={cn('flex items-center justify-between gap-6', className)}
      {...props}
    >
      <BackButton />
      <NextButton disabled={!currentPageValid} />
    </nav>
  );
}
