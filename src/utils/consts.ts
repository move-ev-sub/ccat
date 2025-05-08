/**
 * Contains all of the static routes for the application process.
 */
export const ApplicationRoutes = {
  /** General information about the applicant */
  GENERAL_ROUTE: '/user/new-application/general',

  /** Select the events the applicant wants to apply to */
  SELECT_ROUTE: '/user/new-application/select',

  /** Write cover letters for the selected events */
  COVER_LETTERS_ROUTE: '/user/new-application/cover-letters',

  /** Prioritize the events */
  PRIORITIZE_ROUTE: '/user/new-application/prioritize',

  /** Review the application */
  REVIEW_ROUTE: '/user/new-application/review',
} as const;

export const Email = {
  FROM: 'Do Not Reply <donotreply@transactional.consultingcontact.de>',
};
