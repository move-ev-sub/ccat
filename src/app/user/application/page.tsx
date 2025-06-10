import { ApplicationRoutes } from '@/lib/consts/routes';
import { redirect } from 'next/navigation';

/**
 * Since nothing is displayed at the base route "/user/new-application" we redirect
 * to the general form route.
 */
export default function NewApplicationPage() {
  redirect(ApplicationRoutes.GENERAL_ROUTE);
}
