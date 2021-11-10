const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Cart },
} = require("../db");

module.exports = router;

router.get("/:cartId", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// Add item to cart, put request to cart, adds to items
router.put("/:cartId", async (req, res, next) => {
  try {
    await Cart.update(
      {
        items: Sequelize.fn("CONCAT", Sequelize.col("items"), req.body.itemId),
      },
      { where: { id: req.params.cartId } }
    );
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});
