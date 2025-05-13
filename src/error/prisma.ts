export const PRISMA_ERRORS = {
  RECORD_NOT_FOUND:
    'Der gesuchte Eintrag konnte in der Datenbank nicht gefunden werden.',
};

export const PRISMA_ERROR_MAP: Record<string, string> = {
  P2025: PRISMA_ERRORS.RECORD_NOT_FOUND,
};
