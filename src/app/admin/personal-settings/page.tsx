import { PersonalSettingsForm } from '@/components/auth/forms/personal-settings-form';
import { PageContainer } from '@/components/page-container';
import { PageTitle } from '@/components/page-header';
import { auth } from '@/utils/auth';
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
