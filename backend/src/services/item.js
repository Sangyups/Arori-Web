const Item = require('../models/item');

module.exports = class ItemService {
  static async createItem(name, desc, price, fileName) {
    await Item.create({
      name,
      desc,
      price,
      fileName,
    });
  }

  static async getAllItems() {
    return Item.findAll({});
  }

  static async getItem(itemId) {
    return Item.findByPk(itemId);
  }
};
