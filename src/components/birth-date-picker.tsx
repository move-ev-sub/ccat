'use client';

/** @see https://tremor.so/docs/inputs/date-picker#example-custom-birth-date-picker */

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils/cn';
import {
  CakeIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/16/solid';
import * as PopoverPrimitives from '@radix-ui/react-popover';
import { cva, VariantProps } from 'class-variance-authority';
import {
  format,
  getYear,
  isSameMonth,
  setMonth,
  setYear,
  type Locale,
} from 'date-fns';
import { enUS } from 'date-fns/locale';
import React from 'react';
import {
  DayPicker,
  Matcher,
  useDayPicker,
  useDayRender,
  useNavigation,
  type DayPickerSingleProps,
  type DayProps,
} from 'react-day-picker';

//#region Tremor Custom Birth Date Calendar
interface NavigationButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  icon: React.ElementType;
  disabled?: boolean;
}

const NavigationButton = React.forwardRef<
  HTMLButtonElement,
  NavigationButtonProps
>(
  (
    { onClick, icon, disabled, ...props }: NavigationButtonProps,
    forwardedRef
  ) => {
    const Icon = icon;
    return (
      <button
        ref={forwardedRef}
        type="button"
        disabled={disabled}
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-sm border p-1 outline-hidden transition select-none sm:size-[30px]',
          // text color
          'text-secondary hover:text-foreground',
          // border color
          'border-border',
          // background color
          'hover:bg-background-muted active:bg-background-muted',
          // disabled
          'disabled:pointer-events-none disabled:opacity-60',
          // focus
          'focus-indicator'
        )}
        onClick={onClick}
        {...props}
      >
        <Icon className="size-full shrink-0" />
      </button>
    );
  }
);

NavigationButton.displayName = 'NavigationButton';

type OmitKeys<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type KeysToOmit = 'showWeekNumber' | 'captionLayout' | 'mode';

type SingleProps = OmitKeys<DayPickerSingleProps, KeysToOmit>;

type CalendarProps =
  | ({
      mode: 'single';
    } & SingleProps)
  | ({
      mode?: undefined;
    } & SingleProps);

const CalendarPrimitive = React.memo(
  ({
    weekStartsOn = 1,
    numberOfMonths = 1,
    disableNavigation,
    locale,
    className,
    classNames,
    ...props
  }: CalendarProps) => {
    return (
      <DayPicker
        weekStartsOn={weekStartsOn}
        numberOfMonths={numberOfMonths}
        locale={locale}
        showOutsideDays={numberOfMonths === 1}
        className={cn(className)}
        classNames={{
          months: 'flex space-y-0',
          month: 'space-y-4 p-3',
          nav: 'gap-1 flex items-center rounded-full size-full justify-between p-4',
          table: 'w-full border-collapse space-y-1',
          head_cell:
            'w-9 font-medium text-sm sm:text-xs text-center text-secondary pb-2',
          row: 'w-full mt-0.5',
          cell: cn(
            'relative p-0 text-center focus-within:relative',
            'text-foreground'
          ),
          day: cn(
            'size-9 rounded-sm text-sm focus:z-10',
            'text-foreground',
            'hover:bg-background-muted',
            'focus-indicator'
          ),
          day_today: 'font-semibold',
          day_selected: cn(
            'rounded-sm',
            'aria-selected:bg-foreground aria-selected:text-background'
          ),
          day_disabled:
            'text-secondary! opacity-70 line-through disabled:hover:bg-transparent',
          day_outside: 'text-secondary',
          day_range_middle: cn(
            'rounded-none!',
            'aria-selected:bg-background-muted aria-selected:text-foreground-muted'
          ),
          day_range_start: 'rounded-r-none rounded-l!',
          day_range_end: 'rounded-l-none rounded-r!',
          day_hidden: 'invisible',
          ...classNames,
        }}
        components={{
          IconLeft: () => (
            <ChevronLeftIcon aria-hidden="true" className="size-4" />
          ),
          IconRight: () => (
            <ChevronRightIcon aria-hidden="true" className="size-4" />
          ),
          Caption: ({ displayMonth }) => {
            const { goToMonth, nextMonth, previousMonth, displayMonths } =
              useNavigation();
            const { numberOfMonths } = useDayPicker();

            const displayIndex = displayMonths.findIndex((month) =>
              isSameMonth(displayMonth, month)
            );
            const isFirst = displayIndex === 0;
            const isLast = displayIndex === displayMonths.length - 1;

            const hideNextButton = numberOfMonths > 1 && (isFirst || !isLast);
            const hidePreviousButton =
              numberOfMonths > 1 && (isLast || !isFirst);

            const currentSelectedYear = getYear(displayMonth);
            const currentYear = getYear(new Date());
            const years = Array.from(
              { length: 101 },
              (_, i) => currentYear - 100 + i
            );

            return (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <>
                    <label htmlFor="year-select" className="sr-only" />
                    <Select
                      value={currentSelectedYear.toString()}
                      onValueChange={(e) =>
                        goToMonth(setYear(displayMonth, parseInt(e)))
                      }
                    >
                      <SelectTrigger id="year-select" className="h-8 w-[100px]">
                        <SelectValue placeholder="Select a year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <label htmlFor="month-select" className="sr-only" />
                    <Select
                      value={displayMonth.getMonth().toString()}
                      onValueChange={(e) =>
                        goToMonth(setMonth(displayMonth, parseInt(e)))
                      }
                    >
                      <SelectTrigger
                        id="month-select"
                        className="h-8 w-[120px]"
                      >
                        <SelectValue placeholder="Select a month" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          'January',
                          'February',
                          'March',
                          'April',
                          'May',
                          'June',
                          'July',
                          'August',
                          'September',
                          'October',
                          'November',
                          'December',
                        ].map((month, index) => (
                          <SelectItem
                            key={month.toString()}
                            value={index.toString()}
                          >
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                </div>
                <div className="flex items-center gap-1">
                  {!hidePreviousButton && (
                    <NavigationButton
                      disabled={disableNavigation || !previousMonth}
                      aria-label="Go to previous month"
                      onClick={() => previousMonth && goToMonth(previousMonth)}
                      icon={ChevronLeftIcon}
                    />
                  )}
                  {!hideNextButton && (
                    <NavigationButton
                      disabled={disableNavigation || !nextMonth}
                      aria-label="Go to next month"
                      onClick={() => nextMonth && goToMonth(nextMonth)}
                      icon={ChevronRightIcon}
                    />
                  )}
                </div>
              </div>
            );
          },
          Day: ({ date, displayMonth }: DayProps) => {
            const buttonRef = React.useRef<HTMLButtonElement>(null);
            const {
              activeModifiers,
              buttonProps,
              divProps,
              isButton,
              isHidden,
            } = useDayRender(
              date,
              displayMonth,
              buttonRef as React.RefObject<HTMLButtonElement>
            );

            const { selected, today, disabled, range_middle } = activeModifiers;

            if (isHidden) {
              return <></>;
            }

            if (!isButton) {
              return (
                <div
                  {...divProps}
                  className={cn(
                    'flex items-center justify-center',
                    divProps.className
                  )}
                />
              );
            }

            const {
              children: buttonChildren,
              className: buttonClassName,
              ...buttonPropsRest
            } = buttonProps;

            return (
              <button
                ref={buttonRef}
                {...buttonPropsRest}
                type="button"
                className={cn('relative', buttonClassName)}
              >
                {buttonChildren}
                {today && (
                  <span
                    className={cn(
                      'absolute inset-x-1/2 bottom-1.5 h-0.5 w-4 -translate-x-1/2 rounded-[2px]',
                      {
                        'bg-blue-500 dark:bg-blue-500': !selected,
                        'bg-white! dark:bg-gray-950!': selected,
                        'bg-gray-400! dark:bg-gray-600!':
                          selected && range_middle,
                        'bg-gray-400 text-gray-400 dark:bg-gray-400 dark:text-gray-600':
                          disabled,
                      }
                    )}
                  />
                )}
              </button>
            );
          },
        }}
        tremor-id="tremor-raw"
        {...(props as SingleProps)}
      />
    );
  }
);

CalendarPrimitive.displayName = 'CalendarPrimitive';

//#region Trigger
// ============================================================================

export const triggerStyles = cva(
  [
    // base
    'peer flex w-full cursor-pointer appearance-none items-center gap-x-2 truncate rounded-md border px-3 py-2 shadow-xs outline-hidden transition-all sm:text-sm',
    // background color
    'bg-white dark:bg-gray-950',
    // border color
    'border-gray-300 dark:border-gray-800',
    // text color
    'text-gray-900 dark:text-gray-50',
    // placeholder color
    'placeholder-gray-400 dark:placeholder-gray-500',
    // hover
    'hover:bg-gray-50 dark:hover:bg-gray-950/50',
    // disabled
    'disabled:pointer-events-none',
    'disabled:bg-gray-100 disabled:text-gray-400',
    'dark:disabled:border-gray-800 dark:disabled:bg-gray-800 dark:disabled:text-gray-500',
    // focus
    'focus-indicator',
  ],
  {
    variants: {
      hasError: {
        true: 'ring-2 ring-red-200 border-red-500',
      },
    },
  }
);

interface TriggerProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof triggerStyles> {
  placeholder?: string;
}

const Trigger = React.memo(
  React.forwardRef<HTMLButtonElement, TriggerProps>(
    (
      { className, children, placeholder, ...props }: TriggerProps,
      forwardedRef
    ) => {
      return (
        <PopoverPrimitives.Trigger asChild>
          <Button
            variant="outline"
            ref={forwardedRef}
            className={cn('h-9 rounded-md', className)}
            {...props}
          >
            <CalendarIcon />
            <span className="flex-1 overflow-hidden text-left text-ellipsis whitespace-nowrap">
              {children ? (
                children
              ) : placeholder ? (
                <span className="text-secondary">{placeholder}</span>
              ) : null}
            </span>
          </Button>
        </PopoverPrimitives.Trigger>
      );
    }
  )
);

Trigger.displayName = 'DatePicker.Trigger';

//#region Popover
// ============================================================================

const CalendarPopover = React.memo(
  React.forwardRef<
    React.ElementRef<typeof PopoverPrimitives.Content>,
    React.ComponentProps<typeof PopoverPrimitives.Content>
  >(({ align, className, children, ...props }, forwardedRef) => {
    return (
      <PopoverPrimitives.Portal>
        <PopoverPrimitives.Content
          ref={forwardedRef}
          sideOffset={10}
          side="bottom"
          align={align}
          avoidCollisions
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            // base
            'relative z-50 w-fit rounded-md border text-sm shadow-xl shadow-black/[2.5%]',
            // widths
            'max-w-[95vw] min-w-[calc(var(--radix-select-trigger-width)-2px)]',
            // border color
            'border-gray-200 dark:border-gray-800',
            // background color
            'bg-white dark:bg-gray-950',
            // transition
            'will-change-[transform,opacity]',
            'data-[state=closed]:animate-hide',
            'data-[state=open]:data-[side=bottom]:animate-slideDownAndFade data-[state=open]:data-[side=left]:animate-slideLeftAndFade data-[state=open]:data-[side=right]:animate-slideRightAndFade data-[state=open]:data-[side=top]:animate-slideUpAndFade',
            className
          )}
          {...props}
        >
          {children}
        </PopoverPrimitives.Content>
      </PopoverPrimitives.Portal>
    );
  })
);

CalendarPopover.displayName = 'DatePicker.CalendarPopover';

//#region Date Picker Shared
// ============================================================================

const formatDate = (date: Date, locale: Locale): string => {
  const dateString: string = format(date, 'dd MMM, yyyy', { locale });

  return dateString;
};

type CalendarPickerProps = {
  fromYear?: number;
  toYear?: number;
  fromMonth?: Date;
  toMonth?: Date;
  fromDay?: Date;
  toDay?: Date;
  fromDate?: Date;
  toDate?: Date;
  locale?: Locale;
};

type Translations = {
  cancel?: string;
  apply?: string;
  start?: string;
  end?: string;
  range?: string;
};

interface PickerProps extends CalendarPickerProps {
  className?: string;
  disabled?: boolean;
  disabledDays?: Matcher | Matcher[] | undefined;
  required?: boolean;
  showTimePicker?: boolean;
  placeholder?: string;
  enableYearNavigation?: boolean;
  disableNavigation?: boolean;
  hasError?: boolean;
  id?: string;
  // Customize the date picker for different languages.
  translations?: Translations;
  align?: 'center' | 'end' | 'start';
  'aria-invalid'?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-required'?: boolean;
}

//#region Single Date Picker
// ============================================================================

interface SinglePickerProps extends Omit<PickerProps, 'translations'> {
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  translations?: Omit<Translations, 'range'>;
}

const SingleDatePicker = ({
  defaultValue,
  value,
  onChange,
  disabled,
  disabledDays,
  disableNavigation,
  className,
  placeholder = 'Select date',
  hasError,
  locale = enUS,
  align = 'center',
  ...props
}: SinglePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    value ?? defaultValue ?? undefined
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialDate = React.useMemo(() => date, [open]);

  React.useEffect(() => {
    setDate(value ?? defaultValue ?? undefined);
  }, [value, defaultValue]);

  React.useEffect(() => {
    if (date) {
      setMonth(date);
    }
  }, [date]);

  React.useEffect(() => {
    if (!open) {
      setMonth(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onCancel = React.useCallback(() => {
    setDate(initialDate);
    setOpen(false);
  }, [initialDate]);

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        onCancel();
      }
      setOpen(open);
    },
    [onCancel]
  );

  const onDateChange = React.useCallback((newDate: Date | undefined) => {
    setDate(newDate);
  }, []);

  const formattedDate = React.useMemo(() => {
    if (!date) {
      return null;
    }
    return formatDate(date, locale);
  }, [date, locale]);

  const onApply = React.useCallback(() => {
    setOpen(false);
    onChange?.(date);
  }, [onChange, date]);

  React.useEffect(() => {
    setDate(value ?? defaultValue ?? undefined);
  }, [value, defaultValue]);

  return (
    <PopoverPrimitives.Root
      tremor-id="tremor-raw"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Trigger
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        hasError={hasError}
        aria-required={props.required || props['aria-required']}
        aria-invalid={props['aria-invalid']}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
      >
        {formattedDate}
      </Trigger>
      <CalendarPopover align={align}>
        <div className="flex">
          <div className="flex flex-col sm:flex-row sm:items-start">
            <div>
              <CalendarPrimitive
                mode="single"
                month={month}
                onMonthChange={setMonth}
                selected={date}
                onSelect={onDateChange}
                disabled={disabledDays}
                locale={locale}
                disableNavigation={disableNavigation}
                initialFocus
                {...props}
              />
              <div className="flex items-center gap-x-2 border-t border-gray-200 p-3 dark:border-gray-800">
                <Button
                  variant="outline"
                  className="h-8 w-full"
                  type="button"
                  onClick={onCancel}
                >
                  Abbrechen
                </Button>
                <Button
                  variant="accent"
                  className="h-8 w-full"
                  type="button"
                  disabled={!date}
                  onClick={onApply}
                >
                  Anwenden
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CalendarPopover>
    </PopoverPrimitives.Root>
  );
};

//#region Types & Exports
// ============================================================================

type SingleDatePickerProps = {
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
} & PickerProps;

export const DatePicker = React.memo(({ ...props }: SingleDatePickerProps) => {
  return <SingleDatePicker {...(props as SinglePickerProps)} />;
});

DatePicker.displayName = 'DatePicker';

export const DatePickerBirthDateExample = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  return (
    <div className="flex flex-col items-center gap-y-4">
      <DatePicker
        toDate={new Date()}
        value={date}
        onChange={setDate}
        className="w-60"
      />
      <p className="flex items-center rounded-md bg-gray-100 p-2 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-300">
        <CakeIcon className="mr-2 ml-1 size-4 text-blue-500" />
        Date of Birth: {date ? date.toLocaleDateString() : 'None'}
      </p>
    </div>
  );
};
