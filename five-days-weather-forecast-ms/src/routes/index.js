const express = require('express');
const axios = require('axios');
const { NOT_FOUND_ERROR, UNAUTHORIZED_ERROR, BAD_REQUEST_ERROR } = require('../errors/codes');
const APIInvalidKeyError = require('../errors/api-invalid-key.error');
const CityNotFoundError = require('../errors/city-not-found.error');
const APIInternalServerError = require('../errors/api-internal-server.error');
const BadRequestError = require('../errors/bad-request.error');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logging/logger');

const router = express.Router();

// Non-blocking
router.get('/api', async (req, res) => {
  const request_id = uuidv4();
  const { city } = req.query;
  try {
    // Non-blocking
    const result = await axios.get(
      process.env.WEATHER_API_URL,
      {
        params: {
          q: city,
          appid: process.env.WEATHER_API_ID
        }
      }
    );
    logger.info(`${new Date().toISOString()} { ${request_id} } => ACCEPTED`);
    // Blocking
    res.send({
      ...result.data,
      request_id
    });
  } catch (e) {
    logger.info(`${new Date().toISOString()} { ${request_id} } => REJECTED`);
    if (e.response.status === BAD_REQUEST_ERROR) {
      throw new BadRequestError();
    }
    if (e.response.status === UNAUTHORIZED_ERROR) {
      throw new APIInvalidKeyError();
    }
    if (e.response.status === NOT_FOUND_ERROR) {
      throw new CityNotFoundError();
    }
    throw new APIInternalServerError();
  }
});

module.exports = {
  nextFiveDaysWeatherForecastRouter: router
};
