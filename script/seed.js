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
    User.create({ username: 'dan', password: '123' }),
  ]);

  console.log(`seeded ${users.length} users`);

  //Creating Instruments
  const instruments = await Promise.all([
    //Guitars

    //Fender Squier
    Instrument.create({
      itemType: 'guitar',
      brand: 'Fender',
      model: 'Squier',
      price: 18999,
      description:
        'This limited-edition Squier Bullet Hardtail Stratocaster is designed by Fender from the inside out.',
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/L70499000003000-00-720x720.jpg',
    }),

    //Epiphone SG
    Instrument.create({
      itemType: 'guitar',
      brand: 'Epiphone',
      model: 'SG',
      price: 49999,
      description:
        'The Epiphone SG Traditional PRO recreates a legendary ’60s classic with updated touches for modern players.',
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/L79164000003000-00-720x720.jpg',
    }),

    //Martin D-28
    Instrument.create({
      itemType: 'guitar',
      brand: 'Martin',
      model: 'D-28',
      price: 299900,
      description:
        'The D-28 blends the rich history of the guitar with Martin’s newest and most heralded innovations.',
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/K40776000001000-00-720x720.jpg',
    }),

    //Yamaha FS800
    Instrument.create({
      itemType: 'guitar',
      brand: 'Yamaha',
      model: 'FS800',
      price: 21999,
      description:
        "The FS800 Folk is Yamaha's standard acoustic model, with simple and traditional looks and outstanding quality, at an affordable price.",
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/J32979000001000-00-720x720.jpg',
    }),

    //Drums

    //Alesis Nitro
    Instrument.create({
      itemType: 'drum',
      brand: 'Alesis',
      model: 'Nitro',
      price: 32499,
      description:
        'The Alesis Nitro Mesh Special-Edition 8-Piece electronic drum set delivers the most realistic playing experience for every drummer.',
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/L71942000000000-00-720x720.jpg',
    }),

    //Yamaha Rydeen
    Instrument.create({
      itemType: 'drum',
      brand: 'Yamaha',
      model: 'Rydeen',
      price: 41999,
      description:
        'This shell pack utilizes genuine Yamaha tom holders for simple adjustments and features solid and glitter finishes.',
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/J50178000002000-00-720x720.jpg',
    }),

    //Simmons SD600
    Instrument.create({
      itemType: 'drum',
      brand: 'Simmons',
      model: 'SD600',
      price: 45999,
      description:
        'The Simmons SD600 mesh-head kit with Bluetooth is ideal for players who are looking for an acoustic sound and feel, premium features, and the ability to expand, create and connect wirelessly via Bluetooth.',
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/L28143000000000-00-720x720.jpg',
    }),

    //Roland TD-07KV
    Instrument.create({
      itemType: 'drum',
      brand: 'Roland',
      model: 'TD-07KV',
      price: 99999,
      description:
        'The Roland TD-07KV electronic drum set fully embodies this legacy, bringing high-end technology to a new class of player.',
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/L79468000000000-00-720x720.jpg',
    }),

    //Pianos

    //Williams Rhapsody
    Instrument.create({
      itemType: 'piano',
      brand: 'William',
      model: 'Rhapsody',
      price: 49999,
      description:
        'The Williams Rhapsody 2 digital piano fills your home or studio with impressive looks, great sound, realistic feel and plenty of features.',
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/J17211000002000-00-720x720.jpg',
    }),

    //Yamaha PSR-EW310
    Instrument.create({
      itemType: 'piano',
      brand: 'Yamaha',
      model: 'PSR-EW310',
      price: 26999,
      description:
        'The PSR-EW310 has everything you need in a starter keyboard, with 76 keys for the more serious piano beginner.',
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/L77894000000000-00-720x720.jpg',
    }),

    //Nord Stage 3
    Instrument.create({
      itemType: 'piano',
      brand: 'Nord',
      model: 'Stage 3',
      price: 469900,
      description:
        'The Nord Stage 3 is the fifth iteration of the Stage series pianos, a continuance of Nord’s vision of producing the ultimate instrument for the performing musician.',
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/J53156000001000-00-720x720.jpg',
    }),

    //Roland FP-30X
    Instrument.create({
      itemType: 'piano',
      brand: 'Roland',
      model: 'FP-30X',
      price: 79999,
      description:
        'When quality counts but budget is a factor, the FP-30X is the sweet spot of Roland’s FP-X series.',
      imageurl:
        'https://media.guitarcenter.com/is/image/MMGS7/L79495000001000-00-720x720.jpg',
    }),
  ]);

  //Create Cart
  const carts = await Promise.all([
    Cart.create(),
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
  await users[4].setCart(carts[4]);

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
