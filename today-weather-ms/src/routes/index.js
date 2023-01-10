require('dotenv').config()

const express = require('express');
const axios = require('axios');
const { NOT_FOUND_ERROR, UNAUTHORIZED_ERROR, BAD_REQUEST_ERROR} = require('../errors/codes');
const APIInvalidKeyError = require('../errors/api-invalid-key.error');
const CityNotFoundError = require('../errors/city-not-found.error');
const APIInternalServerError = require('../errors/api-internal-server.error');
const BadRequestError = require("../errors/bad-request.error");
const logger = require('../logging/logger');

const router = express.Router();

// Non-blocking
router.get('/api', async (req, res) => {
  const { city, forecast } = req.query;
  try {
    // Non-blocking
    const today_weather_result = await axios.get(
      process.env.WEATHER_API_URL,
      {
        params: {
          q: city,
          appid: process.env.WEATHER_API_ID
        }
      }
    );
    if (forecast) {
      // Non-blocking
      const forecast_result = await axios.get(
        process.env.WEATHER_MB_URL,
        {
          params: {
            city
          }
        }
      );
      res.send({
        today_weather: today_weather_result.data,
        weather_forecast: forecast_result.data
      });
    }
    // Blocking
    logger.info(`${new Date().toISOString()}=>ACCEPTED`);
    res.send({
      today_weather: today_weather_result.data
    });
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
    throw new APIInternalServerError();
  }
});

module.exports = {
  todayWeatherRouter: router
};
