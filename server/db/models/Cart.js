const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON),
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

Cart.prototype.addItem = async function (item) {
  this.items = [...this.items, item];
  await this.save();
};

Cart.prototype.purchaseCart = async function () {
  //Find user card belongs to
  //Add the cart to that users history
  //Empty the cart
  //Save

  const ownerOfCart = await this.getUser();
  ownerOfCart.orderHistory = [...ownerOfCart.orderHistory, this.items];
  this.items = [];
  await ownerOfCart.save();
  await this.save();
};

module.exports = Cart;
