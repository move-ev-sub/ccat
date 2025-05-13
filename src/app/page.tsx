import { auth } from '@/lib/api/auth';
import { AdminRoutes, CompanyRoutes, UserRoutes } from '@/lib/consts/routes';
import { headers } from 'next/headers';
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/auth/login');
  }

  const role = session.user.role;

  if (role === 'admin') {
    return redirect(AdminRoutes.DASHBOARD);
  }

  if (role === 'company') {
    return redirect(CompanyRoutes.DASHBOARD);
  }

  return redirect(UserRoutes.DASHBOARD);
}
