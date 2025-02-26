import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { buttonVariants } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/16/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function AdminCompaniesSettingsPage() {
  return (
    <PageContainer>
      <PageHeader className="flex items-center justify-between gap-6">
        <div>
          <PageTitle>Unternehmen</PageTitle>
          <PageDesc>
            Hier kannst du Partnerunternehmen hinzufügen, bearbeiten und
            löschen.
          </PageDesc>
        </div>
        <Link
          href={'/admin/new/company'}
          className={buttonVariants({ variant: 'default' })}
        >
          <PlusIcon />
          Neues Unternehmen
        </Link>
      </PageHeader>
      <div className="mt-12">
        <div className="border-border-secondary mx-auto flex min-h-52 w-full max-w-3xl flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <XMarkIcon className="text-accent size-6" />
          <p className="text-foreground mt-6 font-medium">
            Keine Unternehmen gefunden
          </p>
          <p className="text-secondary mt-1 text-sm">
            Klicke auf &quot;Neues Unternehmen&quot;, um ein neues Unternehmen
            hinzuzufügen.
          </p>
        </div>
        <Link href={'#'} className="b"></Link>
      </div>
    </PageContainer>
  );
}
