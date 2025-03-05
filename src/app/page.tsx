import { isAuthenticated } from '@/server/actions/auth';
import { getCurrentRole, getUser } from '@/server/services/auth';
import { redirect } from 'next/navigation';

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
  if (!(await isAuthenticated())) {
    redirect('/auth/login');
  }

  const user = await getUser();

  // If the user is not logged in, redirect them to the login page
  if (user === null) {
    return redirect('/auth/login');
  }

  // Get the users role
  const res = await getCurrentRole();

  // If no profile is present, redirect to login page
  // TODO: Better error handling
  if (!res.ok) {
    return redirect('/auth/login');
  }

  const { data: role } = res;

  // redirect admins to `/admin`
  if (role == 'ADMIN') {
    return redirect('/admin');
  }

  // redirect companies to `/company`
  if (role == 'COMPANY') {
    return redirect('/company');
  }

  // Return all other users to `/user`
  return redirect('/user');
}
