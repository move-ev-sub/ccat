'use client';

/** @see https://tremor.so/docs/inputs/date-picker#example-custom-birth-date-picker */

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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

// #region Navigation Button
// ====================================================================

interface NavigationButtonProps extends React.ComponentProps<'button'> {
  icon: React.ElementType;
}

/**
 * The NavigationButton component renders a button with a specific icon. This button can
 * be used to navigate through the calendar (previous and next month).
 *
 * @param props - The props of the component.
 * @param props.icon - The icon to display on the button.
 */
export function NavigationButton({
  icon: Icon,
  ...props
}: NavigationButtonProps) {
  return (
    <button
      data-slot="calendar-navigation-button"
      type="button"
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-sm border p-1 outline-hidden transition select-none sm:size-[30px]',
        // text color
        'text-secondary hover:text-foreground',
        // border color
        'border-input',
        // background color
        'hover:bg-background-muted active:bg-background-muted',
        // disabled
        'disabled:pointer-events-none disabled:opacity-60',
        // focus
        'focus-indicator'
      )}
      {...props}
    >
      <Icon className="size-full shrink-0" />
    </button>
  );
}

// #region Calendar Primitive
// ====================================================================

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

export function CalendarPrimitive({
  weekStartsOn = 1,
  numberOfMonths = 1,
  disableNavigation,
  locale,
  className,
  classNames,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      data-slot="calendar-primitive"
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
        Caption: ({ displayMonth }) => (
          <Caption
            displayMonth={displayMonth}
            disableNavigation={disableNavigation}
          />
        ),
        Day: DayComponent,
      }}
      {...(props as SingleProps)}
    />
  );
}

// #region Caption
// ====================================================================

interface CaptionProps {
  displayMonth: Date;
  disableNavigation: boolean | undefined;
}

/**
 * Renders the caption above the calendar. The caption contains the year and month
 * select as well as the navigation buttons for navigating through the calendar.
 *
 * @param displayMonth - The currently displayed month.
 * @param disableNavigation - Whether the navigation is disabled.
 */
function Caption({ displayMonth, disableNavigation }: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth, displayMonths } =
    useNavigation();
  const { numberOfMonths } = useDayPicker();

  const displayIndex = displayMonths.findIndex((month) =>
    isSameMonth(displayMonth, month)
  );
  const isFirst = displayIndex === 0;
  const isLast = displayIndex === displayMonths.length - 1;

  const hideNextButton = numberOfMonths > 1 && (isFirst || !isLast);
  const hidePreviousButton = numberOfMonths > 1 && (isLast || !isFirst);

  const currentSelectedYear = getYear(displayMonth);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <>
          <YearSelect
            currentSelectedYear={currentSelectedYear}
            goToMonth={goToMonth}
            displayMonth={displayMonth}
          />

          <MonthSelect displayMonth={displayMonth} goToMonth={goToMonth} />
        </>
      </div>
      <div className="flex items-center gap-1">
        {!hidePreviousButton && (
          <NavigationButton
            disabled={disableNavigation || !previousMonth}
            aria-label="Vorheriger Monat"
            onClick={() => previousMonth && goToMonth(previousMonth)}
            icon={ChevronLeftIcon}
          />
        )}
        {!hideNextButton && (
          <NavigationButton
            disabled={disableNavigation || !nextMonth}
            aria-label="Nächster Monat"
            onClick={() => nextMonth && goToMonth(nextMonth)}
            icon={ChevronRightIcon}
          />
        )}
      </div>
    </div>
  );
}

// #region Year Select
// ====================================================================

interface YearSelectProps extends React.ComponentProps<typeof Select> {
  currentSelectedYear: number;
  goToMonth: (date: Date) => void;
  displayMonth: Date;
}

/**
 * Lets the user select their birth year by using the select component which renders
 * a list of years.
 */
export function YearSelect({
  currentSelectedYear,
  goToMonth,
  displayMonth,
  ...props
}: YearSelectProps) {
  const currentYear = getYear(new Date());
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 100 + i);

  return (
    <>
      <Label htmlFor="year-select" className="sr-only" />
      <Select
        value={currentSelectedYear.toString()}
        onValueChange={(e) => goToMonth(setYear(displayMonth, parseInt(e)))}
        data-slot="calendar-year-select"
        {...props}
      >
        <SelectTrigger id="year-select" className="h-8 w-[100px]">
          <SelectValue placeholder="Wähle ein Jahr" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

// #region Month Select
// ====================================================================

const MONTHS = [
  'January',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

interface MonthSelectProps extends React.ComponentProps<typeof Select> {
  displayMonth: Date;
  goToMonth: (date: Date) => void;
}

/**
 * Lets the user select their birth month by using the select component which renders
 * a list of all months.
 */
export function MonthSelect({
  displayMonth,
  goToMonth,
  ...props
}: MonthSelectProps) {
  return (
    <>
      <Label htmlFor="month-select" className="sr-only" />
      <Select
        value={displayMonth.getMonth().toString()}
        onValueChange={(e) => goToMonth(setMonth(displayMonth, parseInt(e)))}
        data-slot="calendar-month-select"
        {...props}
      >
        <SelectTrigger id="month-select" className="h-8 w-[120px]">
          <SelectValue placeholder="Wähle einen Monat" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((month, index) => (
            <SelectItem key={month.toString()} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

// #region Day Component
// ====================================================================

function DayComponent({ date, displayMonth }: DayProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { activeModifiers, buttonProps, divProps, isButton, isHidden } =
    useDayRender(
      date,
      displayMonth,
      buttonRef as React.RefObject<HTMLButtonElement>
    );

  const { selected, today, disabled, range_middle } = activeModifiers;

  // When the day is hidden, return an empty element.
  if (isHidden) {
    return <></>;
  }

  // If the day is NOT a button, return a div a non-interactive element (div)
  if (!isButton) {
    return (
      <div
        {...divProps}
        className={cn('flex items-center justify-center', divProps.className)}
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
              // TODO: Adjust colors
              'bg-accent': !selected,
              'bg-white! dark:bg-gray-950!': selected,
              'bg-gray-400! dark:bg-gray-600!': selected && range_middle,
              'bg-gray-400 text-gray-400 dark:bg-gray-400 dark:text-gray-600':
                disabled,
            }
          )}
        />
      )}
    </button>
  );
}

// #region Trigger
// ================================================================

interface TriggerProps extends React.ComponentProps<'button'> {
  placeholder?: string;
  children?: React.ReactNode;
}

/**
 * The Trigger for the calendar popover.
 */
const Trigger = React.memo(function Trigger({
  className,
  children,
  placeholder,
  ...props
}: TriggerProps) {
  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn('!rounded-input border-border-input h-9', className)}
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
    </PopoverTrigger>
  );
});

// #region Popover Content
// ====================================================================

const CalendarPopover = React.memo(
  React.forwardRef<
    React.ElementRef<typeof PopoverPrimitives.Content>,
    React.ComponentProps<typeof PopoverPrimitives.Content>
  >(({ align, className, children, ...props }, forwardedRef) => {
    return (
      <PopoverContent
        ref={forwardedRef}
        sideOffset={10}
        side="bottom"
        align={align}
        avoidCollisions
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          'max-w-[95vw] min-w-[calc(var(--radix-select-trigger-width)-2px)]',
          className
        )}
        {...props}
      >
        {children}
      </PopoverContent>
    );
  })
);

CalendarPopover.displayName = 'DatePicker.CalendarPopover';

// #region Date Picker Shared
// ====================================================================

const formatDate = (date: Date, locale: Locale): string => {
  return format(date, 'dd MMM, yyyy', { locale });
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
  translations?: Translations;
  align?: 'center' | 'end' | 'start';
  'aria-invalid'?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-required'?: boolean;
}

// #region Single Date Picker
// ====================================================================

interface SinglePickerProps extends Omit<PickerProps, 'translations'> {
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  translations?: Omit<Translations, 'range'>;
}

export function SingleDatePicker({
  defaultValue,
  value,
  onChange,
  disabled,
  disabledDays,
  disableNavigation,
  className,
  placeholder = 'Select date',
  locale = enUS,
  align = 'center',
  ...props
}: SinglePickerProps) {
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
    <Popover data-slot="date-picker" open={open} onOpenChange={onOpenChange}>
      <Trigger
        placeholder={placeholder}
        disabled={disabled}
        className={className}
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
              <div className="border-border-input flex items-center gap-x-2 border-t p-3">
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
    </Popover>
  );
}

// #region Types & Exports
// ====================================================================

type SingleDatePickerProps = {
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
} & PickerProps;

export const DatePicker = React.memo(function ({
  ...props
}: SingleDatePickerProps) {
  return <SingleDatePicker {...(props as SinglePickerProps)} />;
});
DatePicker.displayName = 'DatePicker';

export function DatePickerBirthDateExample() {
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
        Geburtsdatum: {date ? date.toLocaleDateString() : 'Keine Auswahl'}
      </p>
    </div>
  );
}
