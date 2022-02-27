const db = require('../models/index');

const { sequelize } = db;

module.exports = async () => {
  await sequelize
    .sync({ force: false })
    .then(() => {
      console.log('db connected');
    })
    .catch((err) => {
      console.error(err);
    });
};
