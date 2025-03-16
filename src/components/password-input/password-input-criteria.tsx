import { cn } from '@/utils';
import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { PasswordInputCriteriaProps } from './password-input.types';

/**
 * The PasswordInputCriteria component displays a single criterion for
 * a password input and displays weather the criterion is valid or not.
 * If the criterion is valid, a checkmark icon is displayed, otherwise an
 * x icon is displayed.
 *
 * @param valid - A boolean value indicating if the criterion is valid
 * @param criterion - The criterion to display. This includes the label
 * and the regex to test the password against.
 */
export function PasswordInputCriteria({
  valid,
  criterion,
  className,
  ...props
}: PasswordInputCriteriaProps) {
  return (
    <div
      data-state={valid ? 'valid' : 'invalid'}
      className={cn('group flex items-start justify-start gap-2.5', className)}
      {...props}
    >
      <div className="group-data-[state=valid]:!text-success text-destructive mt-0.5 [&_svg]:size-4">
        {/* Display a checkmark icon if the criterion is valid, otherwise display an x icon */}
        {!valid ? <XMarkIcon /> : <CheckIcon />}
      </div>
      <div>
        <span className="text-secondary group-data-[state=valid]:text-success block text-left text-sm font-medium">
          {criterion.label}
        </span>
      </div>
    </div>
  );
}
