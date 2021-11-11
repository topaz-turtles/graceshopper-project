//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Instrument = require('./models/Instrument');
const Cart = require('./models/Cart');

//associations could go here!
User.belongsToMany(Cart, { through: 'user_cart' });
Cart.belongsTo(User, { through: 'user_cart' });

module.exports = {
  db,
  models: {
    User,
    Instrument,
    Cart,
  },
};
