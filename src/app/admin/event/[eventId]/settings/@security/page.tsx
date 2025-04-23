import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArchiveBoxArrowDownIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sicherheit',
  description:
    'Hier können die Sicherheitseinstellungen der Veranstaltung bearbeitet werden.',
};

export default async function AdminEventSecuritySettingsPage() {
  return (
    <>
      <div>
        <p className="text-lg font-medium">Sicherheit</p>
        <p className="text-secondary mt-2 max-w-prose text-sm">
          Hier kannst du die Sicherheitseinstellungen für die Veranstaltung
          bearbeiten.
        </p>
      </div>
      <div className="mt-10 space-y-12">
        <Card className="border-warning ring-warning/30 ring-2">
          <CardContent className="grid grid-cols-2 gap-8">
            <div>
              <Label>Veranstaltung archivieren</Label>
              <p className="text-secondary mt-1 text-sm">
                Wenn du die Veranstaltung archivierst, können keine neuen
                Bewerbungen mehr eingereicht werden. Die Veranstaltung wird
                weiterhin für dich sichtbar sein, aber nicht mehr für die
                Teilnehmer.
              </p>
            </div>
            <div className="mt-7 flex items-start justify-end">
              <Button className="w-fit" variant={'warning'}>
                Archivieren <ArchiveBoxArrowDownIcon />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="border-destructive ring-destructive/30 ring-2">
          <CardContent className="grid grid-cols-2 gap-8">
            <div>
              <Label>Veranstaltung löschen</Label>
              <p className="text-secondary mt-1 text-sm">
                Wenn du die Veranstaltung löschst, werden alle Daten
                unwiderruflich gelöscht. Diese Aktion kann nicht rückgängig
                gemacht werden. Bevor du die Veranstaltung löschen kannst, musst
                du sie archivieren.
              </p>
            </div>
            <div className="mt-7 flex items-start justify-end">
              <Button className="w-fit" variant={'destructive'} disabled>
                Löschen <TrashIcon />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
