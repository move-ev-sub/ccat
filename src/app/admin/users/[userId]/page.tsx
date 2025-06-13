import { BackLink } from '@/components/back-link';
import { Navbar } from '@/components/layout/navbar';
import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { getUserById } from '@/features/user/services/userService';
import { AdminRoutes } from '@/lib/consts/routes';
import { format } from 'date-fns';

export default async function AdminUserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const res = await getUserById({ id: userId });

  if (!res.ok) {
    throw new Error(res.error);
  }

  const { name, firstName, lastName, email, banned, createdAt, updatedAt } =
    res.data;

  return (
    <>
      <Navbar
        breadcrumbs={[
          {
            label: 'Nutzerverwaltung',
            href: AdminRoutes.USERS,
          },
          {
            label: 'Nutzer',
            href: '#',
          },
        ]}
      />
      <PageContainer>
        <PageHeader className="px-8">
          <BackLink href={AdminRoutes.USERS} />

          <div className="mt-12 flex items-center justify-start gap-4">
            <Avatar className="size-8 rounded-md">
              <AvatarFallback className="text-sm font-medium">
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <PageTitle>
              {firstName} {lastName} {name.length > 0 && `(${name})`}
            </PageTitle>
          </div>
          <PageDesc>{email}</PageDesc>
        </PageHeader>
        <section className="mt-to-header container grid grid-cols-4 gap-8">
          <div className="col-span-3 space-y-20">
            <section className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-foreground font-medium">
                  Allgemeine Informationen
                </p>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="block">Vorname</Label>
                  <Input placeholder={firstName} />
                </div>
                <div className="space-y-2">
                  <Label className="block">Nachname</Label>
                  <Input placeholder={lastName} />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label className="block">Email</Label>
                  <Input placeholder={email} />
                </div>
              </div>
            </section>
            <Separator />
            <section className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-foreground font-medium">
                  Benachrichtigungen
                </p>
              </div>
              <div className="col-span-2 space-y-8">
                <div className="flex items-start justify-start gap-4 space-y-2">
                  <Checkbox />
                  <div className="space-y-2">
                    <Label className="block">E-Mail Benachrichtigungen</Label>
                    <p className="text-secondary max-w-prose text-xs">
                      Der Nutzer erhält Benachrichtigungen zu verschiedenen
                      Veranstaltungen per E-Mail
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-start gap-4 space-y-2">
                  <Checkbox />
                  <div className="space-y-2">
                    <Label className="block">Push Benachrichtigungen</Label>
                    <p className="text-secondary max-w-prose text-xs">
                      Der Nutzer erhält Benachrichtigungen zu verschiedenen
                      Veranstaltungen per Push
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <Separator />
            <section className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-foreground font-medium">Sicherheit</p>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-8">
                <div className="col-span-2 space-y-2">
                  <Label className="block">Rolle</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={'Benutzer'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'user'}>Benutzer</SelectItem>
                      <SelectItem value={'company'}>Unternehmen</SelectItem>
                      <SelectItem value={'admin'}>Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 flex items-center justify-start gap-4">
                  <div className="space-y-2">
                    <Label className="block">Passwort zurücksetzen</Label>
                    <p className="text-secondary max-w-prose text-xs">
                      Der Nutzer erhält eine E-Mail mit einem Link zum
                      Zurücksetzen des Passworts.
                    </p>
                  </div>
                  <Button
                    variant={'outline'}
                    className="ml-auto shrink-0 whitespace-nowrap"
                  >
                    Passwort zurücksetzen
                  </Button>
                </div>
                <div className="col-span-2 flex items-center justify-start gap-4">
                  <div className="space-y-2">
                    <Label className="block">Konto sperren</Label>
                    <p className="text-secondary max-w-prose text-xs">
                      Der Nutzer kann sein Konto nicht mehr verwenden.
                    </p>
                  </div>
                  <Button
                    variant={'outline'}
                    className="ml-auto shrink-0 whitespace-nowrap"
                  >
                    Konto sperren
                  </Button>
                </div>
                <div className="col-span-2 flex items-center justify-start gap-4">
                  <div className="space-y-2">
                    <Label className="block">Konto löschen</Label>
                    <p className="text-secondary max-w-prose text-xs">
                      Der Nutzer wird aus der Datenbank gelöscht. Alle Daten
                      werden gelöscht.
                    </p>
                  </div>
                  <Button
                    variant={'destructive'}
                    className="ml-auto shrink-0 whitespace-nowrap"
                  >
                    Konto löschen
                  </Button>
                </div>
              </div>
            </section>
          </div>
          <aside className="h-fit space-y-6 border-l pl-8">
            <div className="space-y-1">
              <p className="text-foreground text-sm font-medium">Erstellt am</p>
              <p className="text-secondary text-base">
                {format(createdAt, 'dd.MM.yyyy, HH:mm')}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-foreground text-sm font-medium">
                Letzte Aktualisierung
              </p>
              <p className="text-secondary text-base">
                {format(updatedAt, 'dd.MM.yyyy, HH:mm')}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-foreground text-sm font-medium">
                Konto gesperrt
              </p>
              <p className="text-secondary text-base">
                {banned ? (
                  <Badge variant={'red'}>Ja</Badge>
                ) : (
                  <Badge
                    variant={'green'}
                    className="rounded-full border-solid !px-1.5"
                  >
                    Nein
                  </Badge>
                )}
              </p>
            </div>
          </aside>
        </section>
      </PageContainer>
    </>
  );
}
