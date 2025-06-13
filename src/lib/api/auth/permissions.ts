import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access';

export const statement = {
  ...defaultStatements,
  subEvent: [
    'create',
    'share',
    'update',
    'delete',
    'fetchAll',
    'fetchPublished',
    'fetchOwn',
  ],
  event: ['create', 'update', 'delete', 'fetchAll', 'fetchPublished'],
  company: ['create', 'fetchSingle', 'fetchAll'],
  phase: ['create', 'update', 'delete', 'fetchAll'],
  slot: ['create', 'update', 'delete', 'fetchAll'],
  userProfile: ['fetchAll'],
  application: ['fetchOwn'],
} as const;

export const ac = createAccessControl(statement);

// ========================= USER =========================
export const user = ac.newRole({
  subEvent: ['create', 'share', 'delete'],
  application: ['fetchOwn'],
});

// ======================== COMPANY ========================
export const company = ac.newRole({
  subEvent: ['create', 'share', 'fetchOwn'],
});

// ========================= ADMIN =========================
export const admin = ac.newRole({
  subEvent: [
    'create',
    'share',
    'update',
    'delete',
    'fetchAll',
    'fetchPublished',
    'fetchOwn',
  ],
  event: ['create', 'update', 'delete', 'fetchAll', 'fetchPublished'],
  company: ['create', 'fetchSingle', 'fetchAll'],
  phase: ['create', 'update', 'delete', 'fetchAll'],
  slot: ['create', 'update', 'delete', 'fetchAll'],
  userProfile: ['fetchAll'],
  application: ['fetchOwn'],
  // Append default admin statements
  ...adminAc.statements,
});
