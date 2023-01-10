const { INTERNAL_SERVER_ERROR } = require('./codes');

class APIInternalServerError extends Error {
  statusCode = INTERNAL_SERVER_ERROR;
  reason = 'Internal Server Error of the Weather API';

  constructor() {
    super('Internal Server Error');

    Object.setPrototypeOf(this, APIInternalServerError.prototype);
  }

  // Blocking
  serializeErrors() {
    return [{
      message: this.reason
    }];
  }
}

module.exports = APIInternalServerError;
