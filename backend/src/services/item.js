const { ItemNotFoundError } = require('../errors');
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
    const items = await Item.findAll({});
    return items;
  }

  static async getItem(itemId) {
    const item =
      (await Item.findByPk(itemId)) ||
      (() => {
        throw new ItemNotFoundError();
      })();
    return item;
  }
};
