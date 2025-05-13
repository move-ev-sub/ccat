import { Sidebar } from '@/components/layout/sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { CompanyRoutes } from '@/lib/consts/routes';
import { HomeIcon } from '@heroicons/react/16/solid';

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SidebarProvider>
        <Sidebar
          items={[
            {
              icon: HomeIcon,
              title: 'Dashboard',
              url: CompanyRoutes.DASHBOARD,
            },
          ]}
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
