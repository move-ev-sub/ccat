import { cn } from '@/utils';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';
import { ButtonProps, buttonVariants } from './button.types';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, size, variant, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={ref}
        {...props}
        className={cn(
          buttonVariants({
            size,
            variant,
            className,
          })
        )}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
