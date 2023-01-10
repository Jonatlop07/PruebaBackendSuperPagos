const { app } = require('./app');

// Non-blocking
const start = async () => {
  const mb_port = process.env.MB_PORT;

  // Non-blocking
  app.listen(mb_port, () => {
    console.log(`Listening on port ${mb_port}`);
  });
};

start();

