import { StatusCodes } from 'http-status-codes';

export abstract class HTTPError extends Error {
  public readonly code;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export class BadRequest extends HTTPError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class IntervalServer extends HTTPError {
  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export class Forbidden extends HTTPError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export class Unauthorized extends HTTPError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class TooManyRequest extends HTTPError {
  constructor(message: string) {
    super(message, StatusCodes.TOO_MANY_REQUESTS);
  }
}

export class NotFound extends HTTPError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
