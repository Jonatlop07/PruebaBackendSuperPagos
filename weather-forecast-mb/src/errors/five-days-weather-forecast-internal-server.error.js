const { INTERNAL_SERVER_ERROR } = require('./codes');

class FiveDaysWeatherForecastInternalServerError extends Error {
  statusCode = INTERNAL_SERVER_ERROR;
  reason = 'Internal Server Error of the Five Days Weather Forecast Microservice';

  constructor() {
    super('Internal Server Error of the Five Days Weather Forecast Microservice');

    Object.setPrototypeOf(this, FiveDaysWeatherForecastInternalServerError.prototype);
  }

  // Blocking
  serializeErrors() {
    return [{
      message: this.reason
    }];
  }
}

module.exports = FiveDaysWeatherForecastInternalServerError;
