export type ServiceResult<T = object> =
  | {
      ok: false;
      error: string;
      cause?: string | unknown;
    }
  | {
      ok: true;
      data: T;
    };
