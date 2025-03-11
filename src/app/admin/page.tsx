import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { ApplicationsCountChart } from './_components/applications-count-chart';
import { ApplicationsCountBarchart } from './_components/applications-count-chart-bar';
import { GenderDistributionChart } from './_components/gender-distribution-chart';

export default async function AdminGeneralPage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Dashboard</PageTitle>
        <PageDesc className="mb-4">
          Hier ist eine Übersicht über alle Veranstaltungen und
          Unterveranstaltungen.
        </PageDesc>
      </PageHeader>
      <div className="mt-to-header container grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <ApplicationsCountChart />
        <ApplicationsCountBarchart />
        <GenderDistributionChart />
      </div>
    </PageContainer>
  );
}
