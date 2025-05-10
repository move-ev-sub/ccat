import { CompanySidebar } from '@/components/sidebars/company-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SidebarProvider>
        <CompanySidebar variant="inset" />
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
