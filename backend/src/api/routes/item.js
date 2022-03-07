const express = require('express');
const { Joi, celebrate, CelebrateError, Segments } = require('celebrate');

const upload = require('../middlewares/upload');
const ItemService = require('../../services/item');
const { InvalidTypeError } = require('../../errors');

const route = express.Router();

module.exports = (app) => {
  app.use('/items', route);

  route.get('/', async (req, res) => {
    const items = await ItemService.getAllItems();
    res.json(items);
  });

  route.post(
    '/',
    upload.single('file'),
    celebrate(
      {
        body: Joi.object().keys({
          name: Joi.string().required(),
          desc: Joi.string().required(),
          price: Joi.number().required(),
        }),
      },
      { abortEarly: false },
    ),
    async (req, res, next) => {
      const { name, desc, price } = req.body;
      const fileName = req.file ? req.file.filename : null;
      // const fileName = 'silica';
      try {
        await ItemService.createItem(name, desc, price, fileName);
        res.sendStatus(201);
      } catch (err) {
        next(err);
      }
    },
  );

  route.get('/:itemId', async (req, res, next) => {
    try {
      const item = await ItemService.getItem(req.params.itemId);
      res.json(item);
    } catch (err) {
      next(err);
    }
  });
};
