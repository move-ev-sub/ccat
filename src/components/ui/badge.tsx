import { cva, VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    // base
    'font-medium flex justify-center items-center w-fit gap-1.5 border',
    // icon size
    '[&_svg:not([class*="size-"])]:size-3',
    // icon position
    '[&>svg:first-child:not([class*="ml-"])]:-ml-0.5 [&>span+svg:last-child:not([class*="mr-"])]:-mr-0.5 [&>svg+span:not([class*="ml-"])]:-ml-0.5',
  ],
  {
    variants: {
      variant: {
        default: [
          // default
          'bg-primary-100 text-primary-700 [&_svg:not([class*="text-"])]:text-primary-500 border-primary-300',
          // dark
          'dark:bg-primary-700 dark:text-primary-50 dark:[&_svg:not([class*="text-"])]:text-primary-300 dark:border-primary-700',
        ],
        accent: [
          // default
          'bg-accent-100 text-accent-700 [&_svg:not([class*="text-"])]:text-accent-500 border-accent-300',
          // dark
          'dark:bg-accent-900 dark:text-accent-50 dark:[&_svg:not([class*="text-"])]:text-accent-300 dark:border-accent-700',
        ],
        red: [
          // default
          'bg-red-100 text-red-700 [&_svg:not([class*="text-"])]:text-red-500 border-red-300',
          //dark
          'dark:bg-red-900 dark:text-red-50 dark:[&_svg:not([class*="text-"])]:text-red-300 dark:border-red-700',
        ],
        yellow: [
          // default
          'bg-yellow-100 text-yellow-700 [&_svg:not([class*="text-"])]:text-yellow-500 border-yellow-300',
          //dark
          'dark:bg-yellow-900 dark:text-yellow-50 dark:[&_svg:not([class*="text-"])]:text-yellow-300 dark:border-yellow-700',
        ],
        green: [
          // default
          'bg-green-100 text-green-700 [&_svg:not([class*="text-"])]:text-green-500 border-green-300',
          // dark
          'dark:bg-green-900 dark:text-green-50 dark:[&_svg:not([class*="text-"])]:text-green-300 dark:border-green-700',
        ],
        pink: [
          // default
          'bg-pink-100 text-pink-700 [&_svg:not([class*="text-"])]:text-pink-500 border-pink-300',
          // dark
          'dark:bg-pink-900 dark:text-pink-50 dark:[&_svg:not([class*="text-"])]:text-pink-300 dark:border-pink-700',
        ],
        purple: [
          // default
          'bg-purple-100 text-purple-700 [&_svg:not([class*="text-"])]:text-purple-500 border-purple-300',
          // dark
          'dark:bg-purple-900 dark:text-purple-50 dark:[&_svg:not([class*="text-"])]:text-purple-300 dark:border-purple-700',
        ],
        blue: [
          // default
          'bg-blue-100 text-blue-700 [&_svg:not([class*="text-"])]:text-blue-500 border-blue-300',
          // dark
          'dark:bg-blue-900 dark:text-blue-50 dark:[&_svg:not([class*="text-"])]:text-blue-300 dark:border-blue-700',
        ],
        orange: [
          // default
          'bg-orange-100 text-orange-700 [&_svg:not([class*="text-"])]:text-orange-500 border-orange-300',
          // dark
          'dark:bg-orange-900 dark:text-orange-50 dark:[&_svg:not([class*="text-"])]:text-orange-300 dark:border-orange-700',
        ],
      },
      size: {
        sm: ['h-5 py-0.5 px-2 text-xs'],
        md: ['h-5.5 py-0.5 px-2.5 text-sm'],
        lg: ['h-6 py-1 px-3 text-sm'],
      },
      rounded: {
        full: 'rounded-full',
        md: 'rounded-md',
      },
    },
    defaultVariants: {
      size: 'sm',
      variant: 'default',
      rounded: 'full',
    },
  }
);

interface BadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  size,
  variant,
  rounded,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot={'badge'}
      aria-label="badge"
      className={badgeVariants({ size, variant, rounded, className })}
      {...props}
    />
  );
}
