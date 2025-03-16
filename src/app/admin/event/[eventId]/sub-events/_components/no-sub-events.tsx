import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils';
import { PlusIcon } from '@heroicons/react/16/solid';

export function NoSubEvents({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <>
      <div
        data-slot={'no-sub-events'}
        className={cn('flex justify-start gap-4', className)}
        {...props}
      >
        <Input
          placeholder="Suche nach Unterveranstaltungen..."
          disabled
          className="max-w-72"
        />
      </div>
      <div className="relative mt-8 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="bg-background-muted h-64" />
        <div className="bg-background-muted h-64" />
        <div className="bg-background-muted h-64" />
        {/* Overlay */}
        <div className="from-background/20 to-background absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-b text-center">
          <p className="text-foreground font-semibold">
            Keine Unterveranstaltungen gefunden
          </p>
          <p className="text-secondary mt-2 max-w-prose text-sm">
            Erstelle eine neue Unterveranstaltung, um sie hier anzuzeigen.
          </p>
          <Button className="mt-6" variant={'accent'}>
            Neu erstellen <PlusIcon />
          </Button>
        </div>
        ;
      </div>
    </>
  );
}
