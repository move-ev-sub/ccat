import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phasen',
  description: 'Hier können die Phasen der Veranstaltung bearbeitet werden.',
};

export default async function AdminEventPhasesSettingsPage() {
  return (
    <div className="">
      <p className="text-lg font-medium">Phasen</p>
      <p className="text-secondary mt-2 max-w-prose text-sm">
        Veranstaltungen sind in verschiedene Phasen unterteilt. Bevor du eine
        Veranstaltung starten kannst, musst du die Phasen einrichten.
      </p>

      <div className="mt-12 space-y-12">
        <Card>
          <CardContent className="grid grid-cols-2 gap-8">
            <div className="col-span-2">
              <p className="flex items-center justify-start gap-2.5">
                <span className="font-medium">Vorbereitungsphase</span>
                <Badge variant={'error'}>Nicht eingerichtet</Badge>
              </p>
              <p className="text-secondary mt-2 max-w-prose text-xs">
                In der Vorbereitungsphase hast du Zeit die Veranstaltung zu
                planen, die Bewerbungsphase zu erstellen und die
                Unterveranstaltungen zu planen.
              </p>
            </div>
            <div>
              <Label>Startdatum</Label>
              <Input placeholder="10.12.2025" />
            </div>
            <div>
              <Label>Enddatum</Label>
              <Input placeholder="10.12.2025" />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-4">
            <Button variant={'outline'}>Abbrechen</Button>

            <Button variant={'accent'}>Speichern</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardContent className="grid grid-cols-2 gap-8">
            <div className="col-span-2">
              <p className="flex items-center justify-start gap-2.5">
                <span className="font-medium">Bewerbungsphase</span>
                <Badge variant={'error'}>Nicht eingerichtet</Badge>
              </p>
              <p className="text-secondary mt-2 max-w-prose text-xs">
                Nachdem die Vorbereitungsphase abgeschlossen ist, startet die
                Bewerbungsphase. Hier können sich die Teilnehmer für die
                Veranstaltung bewerben.
              </p>
            </div>
            <div>
              <Label>Startdatum</Label>
              <Input placeholder="10.12.2025" />
            </div>
            <div>
              <Label>Enddatum</Label>
              <Input placeholder="10.12.2025" />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-4">
            <Button variant={'outline'} disabled>
              Abbrechen
            </Button>

            <Button variant={'accent'} disabled>
              Speichern
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
