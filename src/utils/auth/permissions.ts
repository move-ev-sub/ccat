import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access';

export const statement = {
  ...defaultStatements,
  subEvent: ['create', 'share', 'update', 'delete'],
  event: ['create', 'share', 'update', 'delete'],
} as const;

export const ac = createAccessControl(statement);

// ========================= USER =========================
export const user = ac.newRole({
  subEvent: ['create', 'share', 'delete'],
});

// ======================== COMPANY ========================
export const company = ac.newRole({
  subEvent: ['create', 'share', 'delete'],
});

// ========================= ADMIN =========================
export const admin = ac.newRole({
  subEvent: ['create', 'share', 'update', 'delete'],
  event: ['create', 'share', 'update', 'delete'],

  // Append default admin statements
  ...adminAc.statements,
});
