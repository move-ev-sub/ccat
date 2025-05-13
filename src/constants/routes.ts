export const AdminRoutes = {
  DASHBOARD: '/admin',
  EVENTS: '/admin/event',
  USERS: '/admin/users',
  PERSONAL_SETTINGS: '/admin/personal-settings',
} as const;

export const CompanyRoutes = {
  DASHBOARD: '/company',
  PERSONAL_SETTINGS: '/company/personal-settings',
} as const;

export const UserRoutes = {
  PERSONAL_SETTINGS: '/user/personal-settings',
} as const;
