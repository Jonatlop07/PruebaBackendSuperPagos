const { app } = require('./app');

// Non-blocking
const start = async () => {
  const ms_port = process.env.MS_PORT;

  // Non-blocking
  app.listen(ms_port, () => {
    console.log(`Listening on port ${ms_port}`);
  });
};

start();


