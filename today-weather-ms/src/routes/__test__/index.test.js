const request = require('supertest');
const { app } = require('../../app');
const { NOT_FOUND_ERROR, BAD_REQUEST_ERROR } = require('../../errors/codes');

const queryTodayWeather = (city, forecast) => {
  return request(app).get(`/api?city=${city}&forecast=${forecast}`);
}

it('can query today\'s weather of a city', async () => {
  const city = 'London';
  await queryTodayWeather(city)
    .send()
    .expect(200);
});

it('can query today\'s weather of a city with the forecast included', async () => {
  const city = 'London';
  const result = await queryTodayWeather(city, true)
    .send()
    .expect(200);
  expect(result.body.weather_forecast).toBeDefined();
});

it('gets a not_found error when the city does not exist', async () => {
  const unexistent_city = 'Londo';
  await queryTodayWeather(unexistent_city)
    .send()
    .expect(NOT_FOUND_ERROR);
});

it('gets a bad_request error when the city is not provided', async () => {
  await queryTodayWeather()
    .send()
    .expect(BAD_REQUEST_ERROR);
});
