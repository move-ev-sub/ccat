'use client';

import { cn } from '@/utils';
import { EyeIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { PasswordInputCriteria } from './password-input-criteria';
import { PasswordCriteria } from './password-input.types';

interface PasswordInputProps
  extends Omit<React.ComponentProps<'input'>, 'value'> {
  criteria: PasswordCriteria[];
  toggalble?: boolean;
  value: string;
}

export function PasswordInput({
  className,
  toggalble,
  criteria,
  onChange,
  value,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);
  // Set the default value of the validCriteria state to an record with all the provided criteria and set each to false
  const [validCriteria, setValidCriteria] = React.useState<
    Record<string, boolean>
  >(() => {
    return criteria.reduce<Record<string, boolean>>((acc, criterion) => {
      acc[criterion.id] = false;
      return acc;
    }, {});
  });

  const onPasswordChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentValue = event.target.value;

      // Check if for each criterion the regex test passes
      const newValidCriteria = criteria.reduce<Record<string, boolean>>(
        (acc, criterion) => {
          acc[criterion.id] = criterion.regex.test(currentValue);
          return acc;
        },
        {}
      );

      // Update the validCriteria state with the newValidCriteria
      setValidCriteria(newValidCriteria);

      // When the onChange prop is provided, call it with the event
      if (onChange) onChange(event);
    },
    [criteria, onChange]
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-start gap-2.5">
        <input
          placeholder="Password"
          className="border-border file:text-foreground placeholder:text-secondary focus-visible:border-ring focus-visible:ring-ring bg-background flex h-9 w-full grow rounded-lg border px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          type={toggalble && visible ? 'text' : 'password'} // Only show password if the component is toggalble and visibility is toggled
          value={value}
          onChange={onPasswordChange}
          {...props}
        />
        {toggalble && (
          <button
            type="button"
            className={buttonVariants({
              variant: 'outline',
              className:
                '[&_svg]:text-foreground flex size-9 shrink-0 items-center justify-center',
            })}
            onClick={() => setVisible((v) => !v)}
          >
            <EyeIcon className="size-4" />
          </button>
        )}
      </div>
      <ul className={cn(criteria.length > 0 ? 'mt-4 space-y-2' : 'hidden')}>
        {criteria.map((criterion) => (
          <li key={criterion.id}>
            <PasswordInputCriteria
              valid={validCriteria[criterion.id]}
              criterion={criterion}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
