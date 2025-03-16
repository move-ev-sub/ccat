import {
  EyeIcon,
  InboxArrowDownIcon,
  InboxStackIcon,
} from '@heroicons/react/16/solid';
import { EventStatus } from '@prisma/client';
import React from 'react';

interface EventStatusToIconProps extends React.ComponentProps<'svg'> {
  status: EventStatus;
}

/**
 * The EventStatusToIcon component maps the status of an event to an icon.
 * This helps to keep the icons consistent across the application.
 */
export function EventStatusToIcon({
  status,
  ...props
}: EventStatusToIconProps) {
  switch (status) {
    case EventStatus.ARCHIVED:
      return <InboxArrowDownIcon {...props} />;
    case EventStatus.DRAFT:
      return <InboxStackIcon {...props} />;
    case EventStatus.PUBLISHED:
      return <EyeIcon {...props} />;
    default:
      return null;
  }
}
