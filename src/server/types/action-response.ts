export type ActionResponse<T> =
  | { status: 'success'; error?: null; data?: T }
  | { status: 'error'; error: string; data?: T };

export type AuthActionResponse<T> = ActionResponse<T>;
