'use client';

import { cn } from '@/utils';
import { ChevronUpDownIcon, PlusCircleIcon } from '@heroicons/react/16/solid';
import { Event } from '@prisma/client';
import * as SelectPrimitive from '@radix-ui/react-select';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectValue,
} from './ui/select';

interface EventSwitchProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  events: Event[];
}

export function EventSwitch({ className, events, ...props }: EventSwitchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [eventId, setEventId] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (!pathname.startsWith('/admin/event/')) {
      setEventId(undefined);
      return;
    }

    const pathParts = pathname.split('/');

    if (pathParts.length < 4) {
      setEventId(undefined);
      return;
    }

    setEventId(pathParts[3]);
  }, [pathname]);

  if (!eventId) {
    return (
      <p className="text-destructive text-xs font-medium">
        Could not find event ID in URL
      </p>
    );
  }

  function onSelect(value: string) {
    if (value === 'new-event') {
      router.push('/admin/new/event');
      return;
    }

    if (value === eventId) {
      return;
    }

    router.push(`/admin/event/${value}`);
  }

  return (
    <Select value={eventId} onValueChange={onSelect}>
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={cn(
          'flex w-60 items-center justify-start gap-2.5 rounded-lg px-2.5 py-1.5 text-start text-sm font-medium transition-colors hover:bg-zinc-100',
          className
        )}
        {...props}
      >
        {/* <p className="truncate">Hello World this is a realy long text</p> */}
        <span className="truncate">
          <SelectValue placeholder="Select event" />
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronUpDownIcon className="ml-auto size-4 shrink-0 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectContent>
        <SelectGroup>
          {events.map((event) => (
            <SelectItem key={event.id} value={event.id}>
              {event.name}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectItem
            value="new-event"
            onSelect={() => router.push('/admin/new/event')}
          >
            <PlusCircleIcon />
            Create new event
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
