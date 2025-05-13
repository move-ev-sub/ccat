import { cn } from '@/lib/utils/cn';
import { BadgeProps, badgeVariants } from './badge.types';

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot={'badge'}
      role="status"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}
