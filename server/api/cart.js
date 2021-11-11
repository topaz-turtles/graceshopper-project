const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { Cart, Instrument },
} = require('../db');

module.exports = router;

router.get('/:cartId', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// Add item to cart, put request to cart, adds to items
router.put('/:cartId', async (req, res, next) => {
  try {
    await Cart.update(
      {
        items: Sequelize.fn(
          'array_append',
          Sequelize.col('items'),
          req.body.itemId
        ),
      },
      { where: { id: req.params.cartId } }
    );
    const item = await Instrument.findByPk(req.body.itemId);

    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
});

router.delete('/:cartId/:itemId', async (req, res, next) => {
  try {
    const { items } = await Cart.findByPk(req.params.cartId);
    const itemIdx = items.indexOf(Number(req.params.itemId));
    items.splice(itemIdx, 1);
    await Cart.update(items, { where: { id: req.params.cartId } });
    res.status(202).send();
  } catch (err) {
    return err;
  }
});
