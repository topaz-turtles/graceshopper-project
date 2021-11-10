const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  items: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [],
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Cart.prototype.purchaseCart = async function () {
  this.purchased = true;
  await this.save();
};

module.exports = Cart;
