const { INTERNAL_SERVER_ERROR } = require('./codes');

class InternalServerError extends Error {
  statusCode = INTERNAL_SERVER_ERROR;
  reason = 'Internal Server Error';

  constructor() {
    super('Internal Server Error');

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  // Blocking
  serializeErrors() {
    return [{
      message: this.reason
    }];
  }
}

module.exports = InternalServerError;
