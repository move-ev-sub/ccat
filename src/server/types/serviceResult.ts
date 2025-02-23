export type ServiceResult<T> = { status: string; loading?: boolean } & (
  | {
      data: T;
      error?: string;
    }
  | {
      data?: T;
      error: string;
    }
);
