'use client';

import { cn } from '@/utils';
import { EyeIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { PasswordInputCriteria } from './password-input-criteria';
import { PasswordInputProps } from './password-input.types';

/**
 * The password input component is a text input that is used to input
 * passwords, generally used for signups. The component takes in an array
 * of criteria that the password must meet. Each criterion is an object
 * with an id, a label, a regex to test the password against, and a zod
 * check function to check the password against a zod schema.
 *
 * For each criterion, a PasswordInputCriteria component is displayed
 * that displays a checkmark icon if the criterion is valid, and an x icon
 * if the criterion is invalid as well as the label of the criterion.
 *
 * It can be a toggleable input, which means that the user can toggle
 * the visibility of the password. If toggalble is set to true, a button
 * will be displayed next to the input that toggles the visibility of the
 * password.
 *
 * @example ```tsx
 * <FormField
 *  control={form.control}
 *  name="password"
 *  render={({ field }) => (
 *    <FormItem>
 *      <FormLabel>Passwort</FormLabel>
 *        <FormControl>
 *          <PasswordInput
 *            toggalble
 *            criteria={passwordCriteria}
 *            {...field}
 *          />
 *        </FormControl>
 *        <FormMessage />
 *    </FormItem>
 *  )}
 * />
 * ```
 */
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

  /**
   * When the value of the input changes, this function is called. It
   * checks if the password meets each criterion and updates the validCriteria
   * state with the result of the test.
   *
   * If the onChange prop is provided, it is called with the event. This is
   * especially important when using the component in a form with react-hook-form.
   */
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
          placeholder="Dein Passwort"
          // Styles copied from the original input component
          className="border-border file:text-foreground placeholder:text-secondary focus-visible:border-ring focus-visible:ring-ring bg-background flex h-9 w-full grow rounded-lg border px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          type={toggalble && visible ? 'text' : 'password'} // Only show password if the component is toggalble and visibility is toggled
          value={value}
          onChange={onPasswordChange}
          {...props}
        />
        {toggalble && (
          // When the component is toggalble, display a button that toggles the visibility of the password
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
          // For each criterion, display a PasswordInputCriteria component
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
