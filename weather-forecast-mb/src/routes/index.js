const express = require('express');
const axios = require('axios');
const { NOT_FOUND_ERROR, UNAUTHORIZED_ERROR, INTERNAL_SERVER_ERROR, BAD_REQUEST_ERROR} = require('../errors/codes');
const APIInvalidKeyError = require('../errors/api-invalid-key.error');
const CityNotFoundError = require('../errors/city-not-found.error');
const FiveDaysWeatherForecastInternalServerError = require('../errors/five-days-weather-forecast-internal-server.error');
const InternalServerError = require('../errors/internal-server.error');
const BadRequestError = require('../errors/bad-request.error');
const logger = require("../logging/logger");

const router = express.Router();

// Non-blocking
router.get('/api', async (req, res) => {
  const { city } = req.query
  if (!city) {
    throw new BadRequestError();
  }
  try {
    // Non-blocking
    const result = await axios.get(
      process.env.FIVE_DAYS_WEATHER_FORECAST_MS_URL,
      {
        params: {
          city,

        }
      }
    );
    logger.info(`${new Date().toISOString()}=>ACCEPTED`);
    // Blocking
    res.send(result.data);
  } catch (e) {
    logger.info(`${new Date().toISOString()}=>REJECTED`);
    if (e.response.status === BAD_REQUEST_ERROR) {
      throw new BadRequestError();
    }
    if (e.response.status === UNAUTHORIZED_ERROR) {
      throw new APIInvalidKeyError();
    }
    if (e.response.status === NOT_FOUND_ERROR) {
      throw new CityNotFoundError();
    }
    if (e.response.status === INTERNAL_SERVER_ERROR) {
      throw new FiveDaysWeatherForecastInternalServerError();
    }
    throw new InternalServerError();
  }
});

module.exports = {
  weatherQueryMessageBrokerRouter: router
};
