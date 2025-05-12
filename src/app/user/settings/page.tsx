// import { UserSettingsForm } from '@/components/forms/change-user-settings';
import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import {} from '@/components/ui/button';
import {} from '@/components/ui/form';
import {} from '@/components/ui/input';

// Force this route to be dynamically rendered
export const dynamic = 'force-dynamic';

export default async function UserSettingsPage() {
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
            <div></div>
          </div>
        </div>
        <div className="border-border hidden border-l bg-zinc-50 md:block dark:bg-zinc-950"></div>
      </main>
    </PageContainer>
  );
}
