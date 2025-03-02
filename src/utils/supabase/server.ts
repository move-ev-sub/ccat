import { env } from '@/env';
import { createServerClient } from '@supabase/ssr';
import {
  SupabaseClient,
  createClient as supabaseJsCreateClient,
} from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Danger! This creates an admin client with the service role key. This should
 * only be used in server-side code any only when absolutely necessary. The service
 * role key gives users the ability to create new users and perform other sensitive
 * operations.
 *
 * @returns {SupabaseClient} The Supabase admin client with the service role key.
 */
export async function createAdminClient(): Promise<SupabaseClient> {
  const client = supabaseJsCreateClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
  return client;
}

export async function createClient() {
  const cookieStore = await cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
