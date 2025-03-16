import { cn } from '@/utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';

export function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-text-muted mt-2 text-sm', className)}
      {...props}
    />
  );
}
