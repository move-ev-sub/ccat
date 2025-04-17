import { PageTitle } from '@/components/page-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Einstellungen',
  description:
    'Hier können die Einstellungen der Veranstaltung bearbeitet werden.',
};

export default async function AdmineEventGeneralSettings() {
  return (
    <div className="">
      <PageTitle>General Einstellungen</PageTitle>
    </div>
  );
}
