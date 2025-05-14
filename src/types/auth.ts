import { auth } from '@/lib/api/auth';
import { statement } from '@/lib/api/auth/permissions';

export type PermissionTypes = keyof typeof statement;
export type PermissionValues<T extends PermissionTypes> =
  (typeof statement)[T][number];

export type Session = typeof auth.$Infer.Session;
