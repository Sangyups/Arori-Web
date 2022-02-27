const express = require('express');
const config = require('./config');
const loader = require('./loaders');

const startServer = async () => {
  const app = express();

  await loader({ expressApp: app });
  app.listen(config.port);
};

startServer();
