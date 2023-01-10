require('dotenv').config();
const express = require('express');
require('express-async-errors')
const { json } = require('body-parser');
const { nextFiveDaysWeatherForecastRouter } = require('./routes');
const RouteNotFoundError = require('./errors/route-not-found.error');

/*
  All of these are blocking
 */
const app = express();
app.use(json());
app.use(nextFiveDaysWeatherForecastRouter);

// Non-blocking
app.all('*', () => {
  throw new RouteNotFoundError();
});

module.exports = {
  app
};
