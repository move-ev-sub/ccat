'use client';

import { SubEventThumbnailCard } from '@/components/sub-event-thumbnail-card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubEvent } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const searchSchema = z.object({
  searchTerm: z.string().nonempty(),
});

/**
 * Users can filter all subevents of an event by searching for them.
 */
export function SubEventsList({ subEvents }: { subEvents: SubEvent[] }) {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: '',
    },
  });

  const { watch } = form;

  const searchTerm = watch('searchTerm');

  const [filteredSubEvents, setFilteredSubEvents] = React.useState(subEvents);

  React.useEffect(() => {
    setFilteredSubEvents(
      subEvents.filter((subEvent) =>
        subEvent.name.toLocaleLowerCase().includes(searchTerm)
      )
    );
  }, [subEvents, setFilteredSubEvents, searchTerm]);

  return (
    <>
      <div className="flex justify-start gap-4">
        <Form {...form}>
          <form className="w-full sm:max-w-72">
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Suche nach Namen..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {filteredSubEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center lg:col-span-2 xl:col-span-3">
            <MagnifyingGlassIcon className="text-accent size-6" />
            <p className="text-foreground mt-6 font-medium">
              Mit diesem Filter wurden keine Ergebnisse gefunden
            </p>
            <p className="text-secondary mt-2 max-w-prose text-sm">
              Versuche es mit einem anderen Suchbegriff. Du kannst nach dem
              Namen der Unterveranstaltung suchen.
            </p>
          </div>
        ) : (
          filteredSubEvents.map((subEvent) => (
            <SubEventThumbnailCard key={subEvent.id} subEvent={subEvent} />
          ))
        )}
      </div>
    </>
  );
}
