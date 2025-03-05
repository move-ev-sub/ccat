import React from 'react';

export default async function AdminGeneralLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      {/* <Navbar className="flex items-center justify-start">
        <AdminMobileNav className="ml-auto block lg:hidden" />
        <div className="hidden gap-2.5 lg:flex">
          <NavigationItem href={'/admin'}>Veranstaltungen</NavigationItem>
          <NavigationItem href={'/admin/settings/users'}>
            Nutzerverwaltung
          </NavigationItem>
          <NavigationItem href={'/admin/settings/companies'}>
            Unternehmensverwaltung
          </NavigationItem>
        </div>
        <ThemeSwitch className="ml-auto hidden lg:flex" />
      </Navbar> */}
      {children}
    </>
  );
}
