'use client';

import { cn } from '@/utils';
import { Slot } from '@prisma/client';
import * as Tabs from '@radix-ui/react-tabs';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import React from 'react';

/**
 * A component for selecting time slots from a list of available slots.
 *
 * The SlotSelector is divided into three columns:
 * 1. Days: Displays available days
 * 2. Time Windows: Shows available time slots for the selected day
 * 3. Selected: Displays details of the selected time slot
 *
 * Features:
 * - Automatic sorting of slots by date
 * - Grouping of slots by date
 * - Localized date and time formatting (German locale)
 * - Keyboard navigation support
 * - Responsive grid layout
 * - Optimized performance with memoization
 *
 * @example
 * ```tsx
 * <SlotSelector
 *   slots={[
 *     {
 *       id: "1",
 *       startDate: new Date("2024-03-20T10:00:00"),
 *       endDate: new Date("2024-03-20T11:00:00"),
 *       // ... other slot properties
 *     }
 *   ]}
 *   value="1"
 *   onChange={(slotId) => console.log(slotId)}
 * />
 * ```
 *
 * @param {Object} props - Component props
 * @param {Slot[]} props.slots - Array of available time slots
 * @param {string | null} props.value - ID of the currently selected slot
 * @param {(value: string | null) => void} props.onChange - Callback function called when a new slot is selected
 *
 * @remarks
 * - Dates are displayed in "dd.MM.yyyy" format
 * - Times are displayed in "HH:mm" format
 * - Weekdays are displayed in German
 * - The component uses Radix UI Tabs for accessibility
 * - Slots are automatically sorted by start date
 * - The first available date is selected by default
 *
 * @component
 */
export function SlotSelector({
  slots,
  value,
  onChange,
}: {
  slots: Slot[];
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  // Memoize the initial value to prevent unnecessary recalculations
  const initialValue = React.useMemo(
    () => slots.find((slot) => slot.id === value) ?? null,
    [slots, value]
  );

  const [localValue, setLocalValue] = React.useState<Slot | null>(initialValue);

  // Update localValue when value prop changes
  React.useEffect(() => {
    setLocalValue(initialValue);
  }, [initialValue]);

  // Sort slots by date and group them
  const sortedSlots = React.useMemo(() => {
    return [...slots].sort(
      (a, b) => a.startDate.getTime() - b.startDate.getTime()
    );
  }, [slots]);

  const slotsByDate = React.useMemo(() => {
    return sortedSlots.reduce(
      (acc, slot) => {
        const date = format(slot.startDate, 'dd.MM.yyyy');
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(slot);
        return acc;
      },
      {} as Record<string, Slot[]>
    );
  }, [sortedSlots]);

  const dates = React.useMemo(() => Object.keys(slotsByDate), [slotsByDate]);

  // Memoize the onSelectSlot callback to prevent unnecessary re-renders
  const onSelectSlot = React.useCallback(
    (slot: Slot) => {
      setLocalValue(slot);
      onChange(slot.id);
    },
    [onChange]
  );

  // Memoize the selected slot details to prevent unnecessary recalculations
  const selectedSlotDetails = React.useMemo(() => {
    if (!localValue) return null;

    return {
      date: localValue.startDate.toLocaleDateString(),
      time: `${format(localValue.startDate, 'HH:mm')} - ${format(
        localValue.endDate,
        'HH:mm'
      )}`,
      weekday: format(localValue.startDate, 'EEEE', { locale: de }),
    };
  }, [localValue]);

  return (
    <Tabs.Root
      className="border-border-secondary grid rounded-lg border sm:grid-cols-3"
      orientation="vertical"
      defaultValue={dates[0]}
    >
      <Row>
        <RowHeader className="rounded-t-lg sm:rounded-tr-none">Tage</RowHeader>
        <RowContent>
          <Tabs.List className="space-y-2">
            {dates.map((date) => (
              <DateTrigger key={date} value={date}>
                {date}
              </DateTrigger>
            ))}
          </Tabs.List>
        </RowContent>
      </Row>
      <Row>
        <RowHeader>Zeitfenster</RowHeader>
        <RowContent>
          {dates.map((date) => (
            <Tabs.Content key={date} value={date} asChild>
              <div
                className="space-y-2 focus-visible:outline-none"
                tabIndex={-1}
              >
                {slotsByDate[date].map((slot) => (
                  <SlotItem
                    key={slot.id}
                    activeValue={localValue}
                    value={slot}
                    onSelect={onSelectSlot}
                  >
                    {format(slot.startDate, 'HH:mm')} -{' '}
                    {format(slot.endDate, 'HH:mm')}
                  </SlotItem>
                ))}
              </div>
            </Tabs.Content>
          ))}
        </RowContent>
      </Row>
      <Row>
        <RowHeader className="sm:rounded-tr-lg">Ausgewählt</RowHeader>
        <RowContent className="space-y-4">
          {selectedSlotDetails ? (
            <>
              <div className="space-y-1">
                <span className="text-secondary block text-sm">Datum</span>
                <span className="text-foreground block text-base font-medium">
                  {selectedSlotDetails.date}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-secondary block text-sm">Zeitslot</span>
                <span className="text-foreground block text-base font-medium">
                  {selectedSlotDetails.time}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-secondary block text-sm">Tag</span>
                <span className="text-foreground block text-base font-medium">
                  {selectedSlotDetails.weekday}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-secondary text-sm">Kein Slot ausgewählt</p>
            </div>
          )}
        </RowContent>
      </Row>
    </Tabs.Root>
  );
}

function Row({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot={'slot-selector-row'}
      className={cn(
        'border-t border-inherit first:border-t-0 last:border-r-0 sm:border-t-0 sm:border-r',
        className
      )}
      {...props}
    />
  );
}

function RowHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot={'slot-selector-row-header'}
      className={cn(
        'bg-background-muted text-foreground border-b border-inherit p-4 text-sm font-medium',
        className
      )}
      {...props}
    />
  );
}

function RowContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot={'slot-selector-row-content'}
      className={cn('p-4', className)}
      {...props}
    />
  );
}

function SlotItem({
  className,
  activeValue,
  onSelect,
  value,
  ...props
}: Omit<React.ComponentProps<'button'>, 'value' | 'onSelect' | 'onClick'> & {
  activeValue: Slot | null;
  value: Slot;
  onSelect: (value: Slot) => void;
}) {
  return (
    <button
      type="button"
      role="button"
      data-state={activeValue?.id === value.id ? 'active' : 'inactive'}
      className={cn(
        'text-foreground w-full rounded-sm border px-2.5 py-1.5 text-center text-sm font-medium',
        'focus-visible:ring-ring focus-visible:ring-offset-background-muted focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'data-[state=active]:text-accent data-[state=active]:bg-accent/15 data-[state=active]:border-accent/30',
        className
      )}
      onClick={() => onSelect(value)}
      {...props}
    />
  );
}

function DateTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Tabs.Trigger>) {
  return (
    <Tabs.Trigger
      className={cn(
        'text-foreground w-full rounded-sm border px-2.5 py-1.5 text-center text-sm font-medium',
        'focus-visible:ring-ring focus-visible:ring-offset-background-muted focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'data-[state=active]:text-accent data-[state=active]:bg-accent/15 data-[state=active]:border-accent/30',
        className
      )}
      {...props}
    />
  );
}
