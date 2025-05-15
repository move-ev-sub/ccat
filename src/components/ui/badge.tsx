import { cva, VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    // base
    'font-medium rounded-full flex justify-center items-center w-fit gap-1.5',
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
          'bg-primary-100 text-primary-700 [&_svg:not([class*="text-"])]:text-primary-500',
          // dark
          'dark:bg-primary-700 dark:text-primary-100 dark:[&_svg:not([class*="text-"])]:text-primary-300',
        ],
        accent: [
          // default
          'bg-accent-100 text-accent-700 [&_svg:not([class*="text-"])]:text-accent-500',
          // dark
          'dark:bg-accent-900 dark:text-accent-100 dark:[&_svg:not([class*="text-"])]:text-accent-300',
        ],
        red: [
          // default
          'bg-red-100 text-red-700 [&_svg:not([class*="text-"])]:text-red-500',
          //dark
          'dark:bg-red-900 dark:text-red-100 dark:[&_svg:not([class*="text-"])]:text-red-300',
        ],
        yellow: [
          // default
          'bg-yellow-100 text-yellow-700 [&_svg:not([class*="text-"])]:text-yellow-500',
          //dark
          'dark:bg-yellow-900 dark:text-yellow-100 dark:[&_svg:not([class*="text-"])]:text-yellow-300',
        ],
        green: [
          // default
          'bg-green-100 text-green-700 [&_svg:not([class*="text-"])]:text-green-500',
          // dark
          'dark:bg-green-900 dark:text-green-100 dark:[&_svg:not([class*="text-"])]:text-green-300',
        ],

        pink: [
          // default
          'bg-pink-100 text-pink-700 [&_svg:not([class*="text-"])]:text-pink-500',
          // dark
          'dark:bg-pink-900 dark:text-pink-100 dark:[&_svg:not([class*="text-"])]:text-pink-300',
        ],
        purple: [
          // default
          'bg-purple-100 text-purple-700 [&_svg:not([class*="text-"])]:text-purple-500',
          // dark
          'dark:bg-purple-900 dark:text-purple-100 dark:[&_svg:not([class*="text-"])]:text-purple-300',
        ],
        blue: [
          // default
          'bg-blue-100 text-blue-700 [&_svg:not([class*="text-"])]:text-blue-500',
          // dark
          'dark:bg-blue-900 dark:text-blue-100 dark:[&_svg:not([class*="text-"])]:text-blue-300',
        ],
        orange: [
          // default
          'bg-orange-100 text-orange-700 [&_svg:not([class*="text-"])]:text-orange-500',
          // dark
          'dark:bg-orange-900 dark:text-orange-100 dark:[&_svg:not([class*="text-"])]:text-orange-300',
        ],
      },
      size: {
        sm: ['h-5 py-0.5 px-2 text-xs'],
        md: ['h-5.5 py-0.5 px-2.5 text-sm'],
        lg: ['h-6 py-1 px-3 text-sm'],
      },
      defaultVariants: {
        size: 'md',
        type: 'default',
      },
    },
  }
);

interface BadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ size, variant, className, ...props }: BadgeProps) {
  return (
    <span
      data-slot={'badge'}
      aria-label="badge"
      className={badgeVariants({ size, variant, className })}
      {...props}
    />
  );
}
