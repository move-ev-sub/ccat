'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slot } from '@/generated/prisma/client';
import { cn } from '@/lib/utils/cn';
import { ArrowTurnDownRightIcon } from '@heroicons/react/16/solid';
import { format } from 'date-fns';
import React from 'react';

type SlotEntries = Record<
  string,
  {
    date: string;
    slots: Slot[];
  }
>;

export function SlotSelector({
  className,
  slots,
  onValueChange,
  value,
  ...props
}: Omit<React.ComponentProps<typeof Select>, 'onValueChange' | 'value'> & {
  className?: string;
  slots: Slot[];
  onValueChange: (value: string | undefined) => void;
  value: string | undefined;
}) {
  const [dayValue, setDayValue] = React.useState<string | undefined>();
  //   const [slotValue, setSlotValue] = React.useState<string | undefined>();

  const slotEntries: SlotEntries = React.useMemo(() => {
    const sortedSlots = [...slots].sort((a, b) => {
      return a.startDate.getTime() - b.startDate.getTime();
    });

    return sortedSlots.reduce((acc, slot) => {
      const date = slot.startDate.toISOString().split('T')[0];
      acc[date] = {
        date,
        slots: [...(acc[date]?.slots || []), slot],
      };
      return acc;
    }, {} as SlotEntries);
  }, [slots]);

  const handleDayChange = (day: string) => {
    setDayValue(day);
    onValueChange(undefined);
  };

  return (
    <div data-slot={'slot-selector'} className={cn(className)}>
      <Select value={dayValue} onValueChange={handleDayChange} {...props}>
        <SelectTrigger>
          <SelectValue placeholder="Wähle ein Datum" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(slotEntries).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {format(value.date, 'dd.MM.yyyy')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-4 flex items-center justify-start gap-4">
        <div className="flex shrink-0 items-center justify-center">
          <ArrowTurnDownRightIcon className="text-secondary size-4" />
        </div>
        {dayValue ? (
          <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="grow">
              <SelectValue placeholder="Wähle einen Slot" />
            </SelectTrigger>
            <SelectContent>
              {slotEntries[dayValue].slots.map((slot) => (
                <SelectItem key={slot.id} value={slot.id}>
                  {format(slot.startDate, 'HH:mm')} -{' '}
                  {format(slot.endDate, 'HH:mm')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Select>
            <SelectTrigger className="grow" disabled>
              <SelectValue placeholder="Wähle zuerst ein Datum" />
            </SelectTrigger>
          </Select>
        )}
      </div>
    </div>
  );
}
