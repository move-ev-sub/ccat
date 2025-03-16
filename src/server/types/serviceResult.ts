export type ServiceResult<T = object> =
  | {
      ok: false;
      error: string;
    }
  | {
      ok: true;
      data: T;
    };
