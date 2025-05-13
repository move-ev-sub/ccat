'use client';

import { cn } from '@/lib/utils/cn';
import { ClockIcon } from '@heroicons/react/16/solid';
import * as React from 'react';
import { TimePickerInput } from './time-picker-input';

export function TimePicker({
  className,
  date,
  setDate,
  ...props
}: React.ComponentProps<'div'> & {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);

  return (
    <div
      data-slot={'time-picker'}
      className={cn('flex items-end gap-2', className)}
      {...props}
    >
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="flex h-full items-center justify-center">
        <span className="text-secondary text-xl/2 font-medium">:</span>
      </div>
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
      <div className="text-accent flex hidden h-9 items-center">
        <ClockIcon className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}
