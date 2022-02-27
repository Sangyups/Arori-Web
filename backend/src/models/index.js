const Sequelize = require('sequelize');
const { env } = require('../config');
const dbConfig = require('../config')[env];
const Item = require('./item');

const db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

db.sequelize = sequelize;
db.Item = Item;

Item.init(sequelize);

module.exports = db;
