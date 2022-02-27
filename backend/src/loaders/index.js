const expressLoader = require('./express');
const sequelizeLoader = require('./sequelize');

module.exports = async ({ expressApp }) => {
  await sequelizeLoader();
  await expressLoader({ app: expressApp });
};
