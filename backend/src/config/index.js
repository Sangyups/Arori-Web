const dotenv = require('dotenv');

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  port: process.env.port || 8000,
  env: process.env.NODE_ENV,
  api: {
    prefix: '/api',
  },
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECT,
  },
};
