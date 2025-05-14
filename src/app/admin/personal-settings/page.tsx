import { PageContainer } from '@/components/page-container';
import { PageTitle } from '@/components/page-header';
import { PersonalSettingsForm } from '@/features/auth/ui/personal-settings-form';
import { auth } from '@/lib/api/auth';
import { headers } from 'next/headers';

export default async function CompanyPersonalSettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('User is not authenticated.');
  }

  const user = session.user;

  return (
    <PageContainer>
      <header className="container px-8">
        <PageTitle>Einstellungen</PageTitle>
      </header>
      <div className="mt-to-header container">
        <PersonalSettingsForm user={user} />
      </div>
    </PageContainer>
  );
}
