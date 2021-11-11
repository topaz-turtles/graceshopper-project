'use strict';

const {
  db,
  models: { User, Instrument, Cart },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'jeff', password: '123' }),
    User.create({ username: 'greg', password: '123' }),
    User.create({ username: 'wilson', password: '123' }),
    User.create({ username: 'dakota', password: '123' }),
  ]);

  console.log(`seeded ${users.length} users`);

  //Creating Instruments
  const instruments = await Promise.all([
    Instrument.create({ itemType: 'guitar', brand: 'fendor', price: 1000, imageurl: 'https://images.reverb.com/image/upload/s--eL1LjCeA--/f_auto,t_large/v1635547543/umviwjty2t3fbe68fi6a.jpg' }),
    Instrument.create({ itemType: 'piano', brand: 'noisy', price: 1000, imageurl: 'https://m.media-amazon.com/images/I/618Bsj-lf4L._AC_SL1500_.jpg' }),
  ]);

  //Create Cart
  const carts = await Promise.all([
    Cart.create(),
    Cart.create(),
    Cart.create(),
    Cart.create(),
  ]);

  //Giving users carts
  await users[0].setCart(carts[0]);
  await users[1].setCart(carts[1]);
  await users[2].setCart(carts[2]);
  await users[3].setCart(carts[3]);

  //Giving carts instruments

  await carts[0].addItem(instruments[0]);
  console.log('Before purchase: ', carts[0]);
  await carts[0].purchaseCart();
  console.log('After purchase :', carts[0]);
  await carts[1].addItem(instruments[0]);
  await carts[1].addItem(instruments[1]);
  await carts[2].addItem(instruments[0]);
  await carts[2].addItem(instruments[1]);
  await carts[3].addItem(instruments[0]);
  await carts[3].addItem(instruments[1]);

  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    instruments,
    carts,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
