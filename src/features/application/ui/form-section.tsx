import { cn } from '@/lib/utils/cn';

interface FormSectionProps
  extends Omit<React.ComponentProps<'section'>, 'label' | 'id'> {
  label: string;
  id: string;
}

export function FormSection({
  className,
  label,
  children,
  ...props
}: FormSectionProps) {
  return (
    <section className={cn('scroll-mt-12', className)} {...props}>
      <FormSectionLabel>{label}</FormSectionLabel>
      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-6">
        {children}
      </div>
    </section>
  );
}

export function FormSectionLabel({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('text-secondary text-sm font-medium', className)}
      role="heading"
      aria-level={2}
      {...props}
    />
  );
}
