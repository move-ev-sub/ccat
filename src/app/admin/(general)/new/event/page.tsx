import { BackLink } from '@/components/back-link';
import { CreateNewEventForm } from '@/components/forms/create-new-event';
import { ClipboardDocumentIcon, PlusIcon } from '@heroicons/react/24/outline';
import * as Tabs from '@radix-ui/react-tabs';

export default async function NewEventPage() {
  return (
    <div className="w-full">
      <BackLink href="/admin" className="mb-8" />
      <h1 className="text-foreground text-xl font-medium">
        Neue Veranstaltung
      </h1>
      <p className="text-secondary mt-2 max-w-prose text-sm">
        Du kannst eine ganz neue Veranstaltung erstellen oder eine bestehende
        Veranstaltung kopieren.
      </p>
      <Tabs.Root defaultValue="custom" className="mt-10">
        <Tabs.List className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Tabs.Trigger
            value="custom"
            className="border-border data-[state=active]:ring-ring data-[state=active]:border-ring group data-[state=active]:bg-accent-50 dark:data-[state=active]:bg-accent-950 block rounded-lg border p-6 text-start focus-visible:outline-none disabled:opacity-70 data-[state=active]:ring-1"
          >
            <PlusIcon className="text-secondary group-data-[state=active]:text-accent size-6" />
            <p className="text-foreground mt-8 text-sm font-medium">
              Neue Veranstaltung
            </p>
            <p className="text-secondary mt-1 text-xs">
              Erstelle eine neue Veranstaltung von Grund auf.
            </p>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="copy"
            disabled
            className="border-border data-[state=active]:ring-ring data-[state=active]:border-ring group data-[state=active]:bg-accent-50 block rounded-lg border p-6 text-start focus-visible:outline-none disabled:opacity-70 data-[state=active]:ring-1"
          >
            <ClipboardDocumentIcon className="text-secondary group-data-[state=active]:text-accent size-6" />
            <p className="text-foreground mt-8 text-sm font-medium">
              Veranstaltung kopieren
            </p>
            <p className="text-secondary mt-1 text-xs">
              Starte mit einer bestehenden Veranstaltung als Vorlage.
            </p>
          </Tabs.Trigger>
        </Tabs.List>
        <div className="bg-border my-12 h-px w-full" />
        <Tabs.Content value="custom">
          <CreateNewEventForm />
        </Tabs.Content>
        <Tabs.Content value="copy">Copy</Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
