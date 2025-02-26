export type ServiceResult<T> =
  | {
      status: 'success';
      error?: string;
      data: T;
    }
  | {
      status: 'error';
      error: string;
      data?: T;
    };
