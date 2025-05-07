import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/utils';
import {
  ArrowRightStartOnRectangleIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  Cog6ToothIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ThemeSwitch } from '../theme-switch';
import { MobileNavigationGroup } from './mobile-navigation-group';
import { MobileNavigationItem } from './mobile-navigation-item';

export function AdminMobileNav({
  className,
  children,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={cn(
            'text-foreground active:bg-background-muted hover:bg-background-muted focus-indicator rounded-lg p-2',
            className
          )}
          {...props}
        >
          <Bars3Icon className="size-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        sheetTitle="Mobile Navigation"
        className="flex flex-col pt-12"
      >
        {children}
        <div className="p-4 pt-0">
          <MobileNavigationGroup label="Navigation">
            <MobileNavigationItem href={'/admin'}>
              <CalendarIcon className="text-secondary size-4" />
              Veranstaltungen
            </MobileNavigationItem>
            <MobileNavigationItem href={'/admin/settings/users'}>
              <UsersIcon className="text-secondary size-4" />
              Nutzerverwaltung
            </MobileNavigationItem>
            <MobileNavigationItem href={'/admin/settings/companies'}>
              <BuildingOfficeIcon className="text-secondary size-4" />
              Unternehmensverwaltung
            </MobileNavigationItem>
          </MobileNavigationGroup>
        </div>
        <div className="mt-auto px-[1.625rem] pb-0">
          <ThemeSwitch />
        </div>
        <div className="mt-0 p-4 pt-0">
          <MobileNavigationGroup>
            <MobileNavigationItem href={'#'}>
              <Cog6ToothIcon className="text-secondary size-4" />
              Einstellungen
            </MobileNavigationItem>
            <MobileNavigationItem href={'#'} variant="destructive">
              <ArrowRightStartOnRectangleIcon className="text-secondary size-4" />
              Abmelden
            </MobileNavigationItem>
          </MobileNavigationGroup>
        </div>
      </SheetContent>
    </Sheet>
  );
}
