import { BackLink } from '@/components/back-link';
import { EventStatusToIcon } from '@/components/event-status-to-icon';
import { AdminSidebar } from '@/components/sidebars/admin-sidebar';
import { ThemeSwitch } from '@/components/theme-switch';
import { Badge } from '@/components/ui/badge';

export default async function UserOverviewPage() {
  return (
    <main className="flex h-screen w-screen items-start justify-start">
      <AdminSidebar />

      <section className="h-full w-full grow overflow-y-auto" tabIndex={-1}>
        <nav className="border-border bg-background flex items-center justify-start border-b px-8 py-3">
          <BackLink href={'#'} />
        </nav>
        <div className="border-border border-b">
          <ul className="flex items-center justify-start gap-6 px-8 py-4">
            <li>
              <p className="text-accent text-sm font-medium">Dashboard</p>
            </li>
            <li>
              <p className="text-foreground text-sm font-medium">
                Unterveranstaltungen
              </p>
            </li>
            <li>
              <p className="text-foreground text-sm font-medium">Bewerbungen</p>
            </li>
            <li>
              <p className="text-foreground text-sm font-medium">Settings</p>
            </li>
          </ul>
        </div>
        <div className="border-border bg-primary-50 dark:bg-primary-950 border-b py-8">
          <div className="container">
            <div className="flex items-start justify-start gap-3">
              {/* <div className="bg-warning relative mt-2.5 size-2 rounded-full">
                <div className="bg-warning absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full" />
              </div> */}
              <div>
                <div className="flex items-center justify-start gap-2.5">
                  <div className="bg-success relative size-2 rounded-full">
                    <div className="bg-success absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full" />
                  </div>
                  <h1 className="text-foreground text-lg font-medium">
                    Consulting Contact 2025
                    <span></span>
                  </h1>
                </div>
                <p className="text-secondary mt-2 text-sm">
                  12. - 14. Oktober 202
                </p>
              </div>
              <Badge variant={'success'} className="mt-1.5 ml-auto">
                <EventStatusToIcon status={'PUBLISHED'} />
                Veröffentlicht
              </Badge>
            </div>
          </div>
        </div>
        <div className="border-border bg-primary-50 dark:bg-primary-950 border-b">
          <div className="divide-border container grid divide-x divide-y px-0 md:grid-cols-2 xl:grid-cols-4 xl:divide-y-0">
            <div className="p-8">
              <p className="text-secondary text-sm">Bewerbungen</p>
              <p className="text-foreground mt-2 text-3xl font-medium">692</p>
            </div>
            <div className="p-8">
              <p className="text-secondary text-sm">Unterveranstaltungen</p>
              <p className="text-foreground mt-2 text-3xl font-medium">12</p>
            </div>
            <div className="p-8">
              <p className="text-secondary text-sm">Teilnehmer:innen gesamt</p>
              <p className="text-foreground mt-2 text-3xl font-medium">271</p>
            </div>
            <div className="p-8">
              <p className="text-secondary text-sm">Frauenquote in %</p>
              <p className="text-foreground mt-2 text-3xl font-medium">34,7%</p>
            </div>
          </div>
        </div>
        <ThemeSwitch />
      </section>
    </main>
  );
}
