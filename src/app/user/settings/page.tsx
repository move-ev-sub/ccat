// import { UserSettingsForm } from '@/components/forms/change-user-settings';
import { UserSettingsForm } from '@/components/forms/change-user-settings';
import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import {} from '@/components/ui/button';
import {} from '@/components/ui/form';
import {} from '@/components/ui/input';
import { fetchCurrentProfile } from '@/server/services/profile';

export default async function UserSettingsPage() {
  // TODO: Find a fancier way to fetch the user profile
  const response = await fetchCurrentProfile();
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return (
    <PageContainer className="grid grid-rows-2">
      <PageHeader>
        <PageTitle>Account Einstellungen</PageTitle>
        <PageDesc>Hier kannst du deine Account-Einstellungen ändern.</PageDesc>
      </PageHeader>
      <main>
        <div className="flex flex-col items-center px-8 py-12">
          {/* <div> */}
          <div className="w-full max-w-sm">
            <div>
              <UserSettingsForm profile={response.data} />
            </div>
          </div>
        </div>
        <div className="border-border hidden border-l bg-zinc-50 md:block dark:bg-zinc-950"></div>
      </main>
    </PageContainer>
  );
}
