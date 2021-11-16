const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { Cart, Instrument, User },
} = require('../db');

module.exports = router;

router.use('/:userId', async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization)
    console.log('user.id', user.id)
    console.log('params.userId', req.params.userId)
    if (req.params.userId != user.id) {
      let error = Error('Access denied')
      throw error;
    } else {
      next();
    }
  } catch (err) {
    next(err)
  }
})

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
    const mappedCart = cart.items.map(item => {
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

//Edit item quantity
router.put('/:userId/edit', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const cart = await user.getCart();
    const { itemId, quantity } = req.body;

    //Map to change quantity
    const mappedCart = cart.items.map(item => {
      if (item.id === itemId) {
        item.quantity = quantity;
      }
      return item;
    });

    cart.items = mappedCart;
    await cart.changed('items', true);
    await cart.save();
    res.status(200).send(cart.items);
  } catch (error) {
    next(error);
  }
});

//Route to checkout cart
router.post('/:userId/checkout', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const cart = await user.getCart();
    await cart.purchaseCart();
    await cart.changed('items', true);
    await cart.save();
    res.status(201).send(cart);
  } catch (err) {
    next(err);
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
