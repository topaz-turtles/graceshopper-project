const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { Cart, Instrument, User },
} = require('../db');

module.exports = router;

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const cart = await user.getCart();

    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// FOR PURCHASING CART
router.post('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const cart = await user.getCart();
    await cart.purchaseCart();
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// Add item to cart, put request to cart, adds to items
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const cart = await user.getCart();

    let found = false;
    let mappedCart = cart.items.map(item => {
      if (item.id === req.body.id) {
        item.quantity++;
        found = true;
      }
      return item;
    });
    cart.items = mappedCart;
    if (found === false) {
      cart.items = [...cart.items, req.body];
    }
    await cart.changed('items', true);
    await cart.save();
    res.status(200).send(cart.items);
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId/:itemId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const cart = await user.getCart();

    cart.items = cart.items.filter(item => item.id != req.params.itemId);
    console.log(cart.items);
    await cart.changed('items', true);
    await cart.save();
    res.status(202).send();
  } catch (err) {
    next(err);
  }
});
