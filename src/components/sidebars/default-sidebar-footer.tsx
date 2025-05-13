'use server';

import { SidebarFooter } from '@/components/ui/sidebar';
import { auth } from '@/utils/auth';
import { headers } from 'next/headers';
import { SidebarProfileMenu } from './sidebar-profile-menu';

export async function DefaultSidebarFooter({
  ...props
}: React.ComponentProps<typeof SidebarFooter>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // TODO: Handle error
    return <p>Error fetching user data. Please try again later.</p>;
  }

  return (
    <SidebarFooter {...props}>
      <SidebarProfileMenu session={session} />
    </SidebarFooter>
  );
}
