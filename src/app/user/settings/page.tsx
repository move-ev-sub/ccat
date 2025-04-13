// import { UserSettingsForm } from '@/components/forms/change-user-settings';
import { UserSettingsForm } from '@/components/forms/change-user-settings';
import {} from '@/components/ui/button';
import {} from '@/components/ui/form';
import {} from '@/components/ui/input';

export default function UserSettingsPage() {
  // console.log(await getUser());

  return (
    <main className="grid min-h-svh grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          <div>
            <h1 className="text-foreground text-xl font-medium">
              Account Einstellungen
            </h1>
            <p className="text-secondary mt-2 text-sm">
              Ändere deine Account-Einstellungen.
            </p>
            <div className="mt-4 mb-7 border-2 border-b-gray-300"></div>
            <UserSettingsForm />
          </div>
        </div>
      </div>
      <div className="border-border hidden border-l bg-zinc-50 md:block dark:bg-zinc-950"></div>
    </main>
  );
}
