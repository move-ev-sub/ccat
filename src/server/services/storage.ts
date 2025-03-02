import { createClient } from '@/utils/supabase/server';
import { ServiceResult } from '../types/serviceResult';

/**
 * Checks if a bucket exists in the storage.
 *
 * @param {string} [name] - The name of the bucket.
 *
 * @returns {Bucket} A promise with the bucket object. If the bucket does not exist,
 * an error is returned.
 */
export async function existsBucket(name: string): Promise<
  ServiceResult<{
    id: string;
    name: string;
    owner: string;
    file_size_limit?: number;
    allowed_mime_types?: string[];
    created_at: string;
    updated_at: string;
    public: boolean;
  }>
> {
  const client = await createClient();

  const { data, error } = await client.storage.getBucket(name);

  if (error || data === null) {
    return {
      ok: false,
      error: 'Bucket does not exist.',
    };
  }

  return {
    ok: true,
    data,
  };
}
