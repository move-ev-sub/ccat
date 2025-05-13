import { CreateUserDialog } from '@/components/create-user-dialog';
import { columns } from '@/components/data-table/tables/users/columns';
import { UsersDataTable } from '@/components/data-table/tables/users/users-data-table';
import { PageContainer } from '@/components/page-container';
import { PageDesc, PageTitle } from '@/components/page-header';
import { getUsers } from '@/server/services/auth';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const res = await getUsers();

  if (!res.ok) {
    throw new Error(res.error);
  }

  const users = res.data;

  return (
    <PageContainer>
      <header>
        <div className="flex items-center justify-between border-b px-8 pb-12">
          <div>
            <PageTitle>Nutzerverwaltung</PageTitle>
            <PageDesc>Hier kannst du alle Nutzer verwalten.</PageDesc>
          </div>
          <CreateUserDialog />
        </div>
      </header>
      <UsersDataTable columns={columns} data={users} />
    </PageContainer>
  );
}
