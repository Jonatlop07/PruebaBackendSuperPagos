const { NOT_FOUND_ERROR } = require('./codes');

class RouteNotFoundError extends Error {
  statusCode = NOT_FOUND_ERROR;
  reason = 'Requested route not found';

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }

  // Blocking
  serializeErrors() {
    return [{
      message: this.reason
    }];
  }
}

module.exports = RouteNotFoundError;
