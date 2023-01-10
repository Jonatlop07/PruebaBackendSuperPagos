const { BAD_REQUEST_ERROR } = require('./codes');

class BadRequestError extends Error {
  statusCode = BAD_REQUEST_ERROR;
  reason = 'Invalid request parameters';

  constructor() {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  // Blocking
  serializeErrors() {
    return [{
      message: this.reason
    }];
  }
}

module.exports = BadRequestError;
