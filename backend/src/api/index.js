const express = require('express');
const item = require('./routes/item');

module.exports = () => {
  const app = express.Router();
  item(app);
  return app;
};
