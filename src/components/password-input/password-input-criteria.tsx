import { cn } from '@/utils';
import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { PasswordCriteria } from './password-input.types';

interface PasswordInputCriteriaProps extends React.ComponentProps<'div'> {
  valid: boolean;
  criterion: PasswordCriteria;
}

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
