'use server';

import { createClient } from '@/utils/supabase/server';
import { SidebarFooter } from '../ui/sidebar';
import { SidebarProfileMenu } from './sidebar-profile-menu';

export async function DefaultSidebarFooter({
  ...props
}: React.ComponentProps<typeof SidebarFooter>) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // TODO: Handle error
    console.error(error);
    return <p>Error fetching user data. Please try again later.</p>;
  }

  return (
    <SidebarFooter {...props}>
      <SidebarProfileMenu user={data.user} />
    </SidebarFooter>
  );
}
