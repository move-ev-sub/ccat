import { Sidebar } from '@/components/layout/sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/api/auth';
import { CompanyRoutes } from '@/lib/consts/routes';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <main>
      <SidebarProvider>
        <Sidebar
          items={[
            {
              icon: 'home',
              title: 'Dashboard',
              url: CompanyRoutes.DASHBOARD,
            },
          ]}
          session={session}
          variant="inset"
        />
        <SidebarInset className="overflow-hidden">
          <main>
            <div className="border-border h-12 w-full shrink-0 border-b px-8 py-2">
              <SidebarTrigger />
            </div>
            <div className="w-full">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
