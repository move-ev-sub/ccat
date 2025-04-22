import {
  BackButton,
  NextButton,
} from '@/components/application/application-navigation';
import { useApplicationStore } from '@/components/application/application.store';
import { useStepContext } from '@/components/application/step';
import { cn } from '@/utils';
import React from 'react';

export function SelectNavigationBar({
  className,
  ...props
}: React.ComponentProps<'nav'>) {
  const { subApplications } = useApplicationStore((store) => store);
  const { nextStep } = useStepContext();

  function onNext() {
    if (subApplications.length === 0) {
      // TODO: Show error message
      return;
    }

    nextStep();
  }

  return (
    <nav
      data-slot={'application-navigation-bar'}
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      <BackButton />
      <NextButton
        type="submit"
        disabled={subApplications.length === 0}
        onClick={onNext}
      >
        Weiter
      </NextButton>
    </nav>
  );
}
