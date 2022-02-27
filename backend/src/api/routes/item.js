const express = require('express');

const upload = require('../middlewares/upload');
const ItemService = require('../../services/item');

const route = express.Router();

module.exports = (app) => {
  app.use('/items', route);

  route.get('/', async (req, res) => {
    const items = await ItemService.getAllItems();
    res.json(items);
  });

  route.post('/', upload.single('file'), async (req, res) => {
    const { name, desc, price } = req.body;
    const fileName = req.file.filename;
    // const fileName = 'silica';

    await ItemService.createItem(name, desc, price, fileName);
    res.sendStatus(201);
  });

  route.get('/:itemId', async (req, res) => {
    const item = await ItemService.getItem(req.params.itemId);
    res.json(item);
  });
};
