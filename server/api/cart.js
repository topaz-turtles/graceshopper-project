const router = require("express").Router();
const {
  models: { Cart },
} = require("../db");

module.exports = router;

router.get("/cart/:cartId", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});
