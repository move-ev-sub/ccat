import { AUTH_ERROR_CODES } from './codes';

export class CCATError extends Error {
  constructor(message: string, cause?: string) {
    super(message);
    this.name = 'CCATError';
    this.message = message;
    this.cause = cause;
    this.stack = '';
  }
}

export class CCATAuthError extends CCATError {
  constructor(message: string, cause?: string) {
    super(message, cause);
    this.name = 'CCATAuthError';
  }
}

export class UnauthenticatedError extends CCATError {
  constructor(cause?: string) {
    super(AUTH_ERROR_CODES.USER_NOT_AUTHENTICATED, cause);
    this.name = 'UnauthenticatedError';
  }
}

export class UnauthorizedError extends CCATError {
  constructor(cause?: string) {
    super(AUTH_ERROR_CODES.USER_NOT_AUTHORIZED, cause);
    this.name = 'UnauthorizedError';
  }
}
