const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'debug',
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'requests.log'
    })
  ],
});

module.exports = logger;
