import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EyeIcon } from '@heroicons/react/16/solid';

/**
 * Redirecting users to the correct page would traditionally be done in a
 * middleware function. In our current middleware we use the updateSession
 * function to update the user's auth session. As seen below, chaining
 * NextJs middleware is a pain in the ass, we redirect users from the landing page.
 *
 * TODO: THIS NEEDS TO BE FIXED
 *
 * @see https://github.com/vercel/next.js/discussions/53997
 * @see https://github.com/BenjaminWFox/nextjs-middleware-chain?tab=readme-ov-file#why
 * @see https://www.reddit.com/r/nextjs/comments/18w4dm1/managing_multiple_middleware_in_nextjs/
 *
 * @returns
 */
export default async function RedirectPage() {
  // if (!(await isAuthenticated())) {
  //   redirect('/auth/login');
  // }
  // const user = await getUser();
  // If the user is not logged in, redirect them to the login page
  // if (user === null) {
  //   return redirect('/auth/login');
  // }
  // Get the users role
  // const res = await getCurrentRole();
  // If no profile is present, redirect to login page
  // TODO: Better error handling
  // if (!res.ok) {
  //   return redirect('/auth/login');
  // }
  // const { data: role } = res;
  // // redirect admins to `/admin`
  // if (role == 'ADMIN') {
  //   return redirect('/admin');
  // }
  // // redirect companies to `/company`
  // if (role == 'COMPANY') {
  //   return redirect('/company');
  // }
  // // Return all other users to `/user`
  // return redirect('/user');
  return (
    <div className="py-32">
      <div className="md:px-8">
        <Tabs defaultValue="tab1">
          <TabsList
            className="pl-8 md:px-0"
            style={{
              scrollbarWidth: 'thin',
            }}
          >
            <TabsTrigger value="tab1">Alle Veranstaltungen</TabsTrigger>
            <TabsTrigger value="tab2">
              <EyeIcon />
              Veröffentlichte Veranstaltungen
            </TabsTrigger>
            <TabsTrigger value="tab3">Entwürfe</TabsTrigger>
            <TabsTrigger value="tab4">Einladungen</TabsTrigger>
            <TabsTrigger value="tab5">Abgelehnte Veranstaltungen</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
