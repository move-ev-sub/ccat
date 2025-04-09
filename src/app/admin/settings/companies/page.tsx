import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { buttonVariants } from '@/components/ui/button';
import { messages as t } from '@/i18n';
import { PlusIcon } from '@heroicons/react/16/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

/**
 * The admin companies settings page displays all companies and allows the
 * user to manage them.
 */
export default async function AdminCompaniesSettingsPage() {
  return (
    <PageContainer>
      <PageHeader className="flex items-center justify-between gap-6">
        <div>
          <PageTitle>{t.pages.companySettings.title()}</PageTitle>
          <PageDesc>{t.pages.companySettings.description()}</PageDesc>
        </div>
        <Link
          href={'/admin/new/company'}
          className={buttonVariants({ variant: 'default' })}
        >
          <PlusIcon />
          {t.pages.companySettings.newCompany()}
        </Link>
      </PageHeader>
      <div className="mt-12">
        <div className="border-border-secondary mx-auto flex min-h-52 w-full max-w-3xl flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <XMarkIcon className="text-accent size-6" />
          <p className="text-foreground mt-6 font-medium">
            {t.pages.companySettings.noCompanies()}
          </p>
          <p className="text-secondary mt-1 text-sm">
            {t.pages.companySettings.noCompaniesDesc()}
          </p>
        </div>
        <Link href={'#'} className="b"></Link>
      </div>
    </PageContainer>
  );
}
