import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { messages as t } from '@/i18n';
import { ApplicationsCountChart } from './_components/applications-count-chart';
import { ApplicationsCountBarchart } from './_components/applications-count-chart-bar';
import { GenderDistributionChart } from './_components/gender-distribution-chart';

export default async function AdminGeneralPage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>{t.pages.dashboard.title()}</PageTitle>
        <PageDesc className="mb-4">{t.pages.dashboard.description()}</PageDesc>
      </PageHeader>
      <div className="mt-to-header container grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <ApplicationsCountChart />
        <ApplicationsCountBarchart />
        <GenderDistributionChart />
      </div>
    </PageContainer>
  );
}
