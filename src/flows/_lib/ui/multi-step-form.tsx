'use client';

import { StepsContext, StepsProvider } from '@/flows/_lib/steps/steps.context';
import { Step } from '@/flows/application/types';
import * as TabsPrimitive from '@radix-ui/react-tabs';

// #region MultiStepForm
// =============================================================
interface MultiStepFormProps extends React.ComponentProps<'div'> {
  steps: Step[];
}

/**
 * A wrapper component, that needs to be wrapped around multi step forms. It contains the
 * required contexts and stores for the form.
 */
export function MultiStepForm({ children, steps }: MultiStepFormProps) {
  return (
    <StepsProvider steps={steps}>
      <StepsContext.Consumer>
        {(ctx) => (
          <TabsPrimitive.Root
            value={ctx.value}
            onValueChange={ctx.setValue}
            style={
              {
                '--max-content-width': '56rem',
              } as React.CSSProperties
            }
          >
            {children}
          </TabsPrimitive.Root>
        )}
      </StepsContext.Consumer>
    </StepsProvider>
  );
}
