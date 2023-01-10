const request = require('supertest');
const { app } = require('../../app');
const { NOT_FOUND_ERROR, BAD_REQUEST_ERROR } = require('../../errors/codes');

const queryWeatherForecast = (city) => {
  return request(app).get(`/api?city=${city}`);
};

it('can query next five days weather forecast of a city', async () => {
  const city = 'London';
  await queryWeatherForecast(city)
    .send()
    .expect(200);
});

it('gets a not_found error when the city does not exist', async () => {
  const unexistent_city = 'Londo';
  await queryWeatherForecast(unexistent_city)
    .send()
    .expect(NOT_FOUND_ERROR);
});

it('gets a bad_request error when the city is not provided', async () => {
  await queryWeatherForecast()
    .send()
    .expect(BAD_REQUEST_ERROR);
});
