const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('../config');
const routes = require('../api');

module.exports = ({ app }) => {
  app.use(cors());

  app.use(express.json());

  app.use(morgan('dev'));

  app.use(config.api.prefix, routes());

  app.use((req, res, next) => {
    const err = new Error('not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};