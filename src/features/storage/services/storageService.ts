'use server';

import { messages as t } from '@/i18n';
import { createClient } from '@/lib/api/supabase/server';
import { ServiceResult } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Checks if a bucket exists in the storage.
 *
 * @param {string} [name] - The name of the bucket.
 *
 * @returns {Promise<ServiceResult<Bucket | null>>} A promise with the result of
 * the operation. If the bucket exists, the bucket data is returned.
 */
export async function existsBucket(
  name: string,
  client?: SupabaseClient
): Promise<
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
  if (!client) {
    client = await createClient();
  }

  const { data, error } = await client.storage.getBucket(name);

  if (error || data === null) {
    return {
      ok: false,
      error: t.errors.bucketDoesNotExist(name),
    };
  }

  return {
    ok: true,
    data,
  };
}

/**
 * Uploads a file to a bucket in the storage. If no file name is provided, the
 * original file name is used.
 *
 * @param {File} file - The file to upload.
 * @param {string} bucketName - The name of the bucket to upload the file to.
 * @param {string} [fileName] - The name of the file in the bucket.
 * @param {SupabaseClient} [client] - The Supabase client to use for the operation.
 *
 * @returns {ServiceResult<{ id: string; path: string; fullPath: string; } | null>} A promise with the result of the operation.
 */
export async function uploadFile(
  file: File,
  bucketName: string,
  fileName?: string,
  client?: SupabaseClient
): Promise<
  ServiceResult<{
    id: string;
    path: string;
    fullPath: string;
  } | null>
> {
  if (!client) {
    client = await createClient();
  }

  if (!(await existsBucket(bucketName, client))) {
    return {
      ok: false,
      error: t.errors.bucketDoesNotExist(bucketName),
    };
  }

  const { data, error } = await client.storage
    .from(bucketName)
    .upload(fileName ?? file.name, file);

  if (error || !data) {
    return {
      ok: false,
      error:
        error.message ??
        t.errors.uploadToBucketFailed(bucketName, fileName ?? file.name),
    };
  }

  return {
    ok: true,
    data,
  };
}
