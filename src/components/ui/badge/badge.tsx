import { cn } from '@/utils';
import { BadgeProps, badgeVariants } from './badge.types';

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot={'badge'}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}
