export class InvalidParams extends Error {
  constructor(validation) {
    if (typeof validation == "string") {
      super([validation]);
    } else {
      const messages = validation.errors.map(e => e.message).flat();
      super(messages);
    }
  }

  get httpStatus() {
    return 400;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super([message]);
  }

  get httpStatus() {
    return 401;
  }
}

export class AuthError extends Error {
  constructor(message) {
    super([message]);
  }

  get httpStatus() {
    return 403;
  }
}

export class NotFound extends Error {
  constructor(message) {
    super([message]);
  }

  get httpStatus() {
    return 404;
  }
}

