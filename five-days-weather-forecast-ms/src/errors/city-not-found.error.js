const { NOT_FOUND_ERROR } = require('./codes');

class CityNotFoundError extends Error {
  statusCode = NOT_FOUND_ERROR;
  reason = 'No city with the provide name was found';

  constructor() {
    super('City not found');

    Object.setPrototypeOf(this, CityNotFoundError.prototype);
  }

  // Blocking
  serializeErrors() {
    return [{
      message: this.reason,
      field: 'city'
    }];
  }
}

module.exports = CityNotFoundError;
