const { UNAUTHORIZED_ERROR } = require('./codes');

class APIInvalidKeyError extends Error {
  statusCode = UNAUTHORIZED_ERROR;
  reason = 'Invalid API Key';

  constructor() {
    super('Invalid API Key');

    Object.setPrototypeOf(this, APIInvalidKeyError.prototype);
  }

  // Blocking
  serializeErrors() {
    return [{
      message: this.reason
    }];
  }
}

module.exports = APIInvalidKeyError;
