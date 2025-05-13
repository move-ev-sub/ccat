export const ApplicationRoutes = {
  GENERAL_ROUTE: '/user/application/general',
  PRIORITIZE_ROUTE: '/user/application/prioritize',
  SELECT_ROUTE: '/user/application/select',
  COVER_LETTERS_ROUTE: '/user/application/cover-letters',
  REVIEW_ROUTE: '/user/application/review',
} as const;

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
