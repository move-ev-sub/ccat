import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { messages as t } from '@/i18n';
import { fetchUserProfiles } from '@/server/services/profile';
import { Metadata } from 'next';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

export const metadata: Metadata = {
  title: 'Nutzerverwaltung',
  description: 'Hier können alle Benutzer verwaltet werden.',
};

/**
 * The AdminUserSettingsPage is the page, where administrators can manage
 * all user profiles. It displays a table with all user profiles and allows
 * the administrator to filter and sort the profiles. First e fetch all
 * profiles with the role "USER" from the database (on the server) and pass
 * them to the DataTable component. The DataTable component then handles the
 * pagination, filtering and sorting of the profiles.
 *
 *
 * Why fetch all profiles at once and not just the ones that are needed?
 *
 * In terms of modern standards we are working with a relatively small
 * dataset here (only a few thounsands of users). Fetching all profiles
 * at once has two main advantages:
 * 1. It simplifies the implementation of the pagination logic.
 * 2. It reduces the number of requests to the server.
 *
 * If we would only fetch the profiles that are needed for the current
 * page, we would have to implement a more complex pagination logic on
 * the client side. With the current approach, we can simply rely on the
 * built in pagination and filtering logic by `@tanstack/react-table`.
 *
 * The downside of fetching all profiles at once is that it requires more
 * memory on the server side. However, since the dataset is relatively
 * small, this should not be a problem.
 *
 * @todo TODO: If the dataset grows significantly in the future, we can consider
 * implementing a more sophisticated pagination logic on the client side.
 * This would require us to fetch only the profiles that are needed for the
 * current page and to implement the pagination logic on the client side
 * (e.g. by using the `swr` library).
 *
 * NOTE: The DataTable component was tested with >10.000 profiles and
 * performed well.
 */
export default async function AdminUserSettingsPage() {
  const res = await fetchUserProfiles();

  // TODO: Implement better error handling
  if (!res.ok) {
    return <p>An error ocurred: {res.error}</p>;
  }

  const { data } = res;

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>{t.pages.userSettings.title()}</PageTitle>
        <PageDesc>{t.pages.userSettings.description()}</PageDesc>
      </PageHeader>
      <div className="mt-to-header container">
        <DataTable columns={columns} data={data} />
      </div>
    </PageContainer>
  );
}
