import { cn } from '@/utils';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { SubApplicationSelection } from './application.store';

export function PriorityList({
  subApplications,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  subApplications: SubApplicationSelection[];
}) {
  const [items, setItems] =
    React.useState<SubApplicationSelection[]>(subApplications);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => item.subEventId === active.id
        );
        const newIndex = items.findIndex((item) => item.subEventId === over.id);

        const newItems = [...items];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);

        return newItems;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext
        items={items.map((item) => item.subEventId)}
        strategy={verticalListSortingStrategy}
      >
        <div
          data-slot={'priority-list'}
          className={cn('space-y-4', className)}
          {...props}
        >
          {items.map((item) => (
            <PriorityListItem key={item.subEventId} subApplication={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export function PriorityListItem({
  className,
  subApplication,
  ...props
}: React.ComponentProps<'li'> & {
  subApplication: SubApplicationSelection;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    index,
  } = useSortable({ id: subApplication.subEventId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        'border-border group bg-background flex cursor-grab items-center justify-start gap-4 rounded-md border px-6 py-4 shadow-sm',
        'group',
        isDragging && 'cursor-grabbing',
        className
      )}
      {...attributes}
      {...listeners}
      {...props}
    >
      <EllipsisVerticalIcon className="text-secondary size-4" />
      <span
        className={cn(
          'bg-background-muted flex size-6 items-center justify-center rounded-full text-sm leading-0 font-medium',
          'group-first:bg-accent transition-colors group-first:text-white'
        )}
      >
        {index + 1}
      </span>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">{subApplication.eventName}</p>
      </div>
    </li>
  );
}
