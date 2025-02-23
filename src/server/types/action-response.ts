export type ActionResponse<T> =
  | { status: 'success'; data?: T }
  | { status: 'error'; error: string };

export type AuthActionResponse<T> = ActionResponse<T>;
