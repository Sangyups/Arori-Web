const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { isCelebrateError } = require('celebrate');
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
    if (!isCelebrateError(err)) {
      return next(err);
    }

    const validation = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [segment, joiError] of err.details.entries()) {
      validation.errors = {
        message: joiError.message,
      };
    }

    return res.status(400).send(validation);
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
