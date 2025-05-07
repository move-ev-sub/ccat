import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React from 'react';

// # region PageNavigation
// ============================================================

interface PageNavigationProps extends React.ComponentProps<'nav'> {
  /**
   * Path to navigate to when the next link is clicked.
   */
  nextRoute?: string;

  /**
   * Path to navigate to when the back link is clicked.
   */
  previousRoute?: string;

  /**
   * Function to be called when the next button is clicked.
   */
  onNext?: () => void;

  /**
   * Function to be called when the back button is clicked.
   */
  onPrevious?: () => void;

  /**
   * Whether the next button can be clicked. Button is disabled if `true`.
   *
   * @default false
   */
  canGoForward: boolean;

  /**
   * Whether the back button can be clicked. Button is disabled if `true`.
   *
   * @default false
   */
  canGoBack: boolean;

  /**
   * Props for the next button. These can be used to extend the default
   * button styles.
   */
  nextButtonProps?: React.ComponentProps<typeof Button>;

  /**
   * Props for the back button. These can be used to extend the default
   * button styles.
   */
  backButtonProps?: React.ComponentProps<typeof Button>;
}

/**
 * Renders a navigation component that allows the user to navigate between
 * pages in the application process. It provides a back button (or link )to
 * go to the previous page and a next button (or link )to go to the next page.
 *
 * If a value is set for `nextRoute`, the next button will be rendered as a
 * link. Otherwise, the next button will be rendered as a button. Same goes
 * for the back button if a value is set for `previousRoute`.
 *
 * @example
 * ```tsx
 * <PageNavigation
 *   nextRoute={ApplicationRoutes.SELECT_ROUTE}
 *   canGoForward={true}
 *   canGoBack={true}
 * />
 * ```
 */
export function PageNavigation({
  onNext,
  onPrevious,
  canGoForward = false,
  canGoBack = false,
  className,
  nextRoute,
  previousRoute,
  nextButtonProps,
  backButtonProps,
  ...props
}: React.ComponentProps<'nav'> & PageNavigationProps) {
  return (
    <nav
      data-slot={'application-page-navigation'}
      className={cn('flex items-center justify-between gap-4', className)}
      {...props}
    >
      {
        // If a route is set for the back button, render a link. Otherwise,
        // render a button.
        previousRoute ? (
          <BackLink canGoBack={canGoBack} previousRoute={previousRoute} />
        ) : (
          <BackButton
            canGoBack={canGoBack}
            onPrevious={onPrevious}
            {...backButtonProps}
          />
        )
      }

      {
        // If a route is set for the next button, render a link. Otherwise,
        // render a button.
        nextRoute ? (
          <NextLink canGoForward={canGoForward} nextRoute={nextRoute} />
        ) : (
          <NextButton
            canGoForward={canGoForward}
            onNext={onNext}
            {...nextButtonProps}
          />
        )
      }
    </nav>
  );
}

// # region NextButton
// ============================================================
export function NextButton({
  className,
  canGoForward,
  onNext,
  ...props
}: React.ComponentProps<typeof Button> & {
  canGoForward: boolean;
  onNext?: () => void;
}) {
  return (
    <Button
      data-slot={'next-button'}
      className={cn(className)}
      variant={'outline'}
      disabled={!canGoForward}
      onClick={onNext}
      {...props}
    >
      Weiter
      <ArrowRightIcon />
    </Button>
  );
}

// # region NextLink
// ============================================================
export function NextLink({
  nextRoute,
  className,
  canGoForward,
  ...props
}: Omit<React.ComponentProps<typeof Link>, 'href'> & {
  nextRoute: string;
  canGoForward: boolean;
}) {
  return (
    <Link
      data-slot={'next-link'}
      aria-disabled={!canGoForward}
      tabIndex={!canGoForward ? -1 : undefined}
      href={nextRoute}
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'aria-disabled:pointer-events-none aria-disabled:opacity-70',
        className
      )}
      {...props}
    >
      Weiter
      <ArrowRightIcon />
    </Link>
  );
}

// # region BackButton
// ============================================================
export function BackButton({
  className,
  canGoBack,
  onPrevious,
  ...props
}: React.ComponentProps<typeof Button> & {
  canGoBack: boolean;
  onPrevious?: () => void;
}) {
  return (
    <Button
      data-slot={'back-button'}
      className={cn(className)}
      variant={'outline'}
      disabled={!canGoBack}
      onClick={onPrevious}
      {...props}
    >
      <ArrowLeftIcon />
      Zurück
    </Button>
  );
}

// # region BackLink
// ============================================================
export function BackLink({
  previousRoute,
  className,
  canGoBack,
  ...props
}: Omit<React.ComponentProps<typeof Link>, 'href'> & {
  previousRoute: string;
  canGoBack: boolean;
}) {
  return (
    <Link
      data-slot={'back-link'}
      aria-disabled={!canGoBack}
      tabIndex={!canGoBack ? -1 : undefined}
      href={previousRoute}
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'aria-disabled:pointer-events-none aria-disabled:opacity-70',
        className
      )}
      {...props}
    >
      <ArrowLeftIcon />
      Zurück
    </Link>
  );
}
