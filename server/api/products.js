const router = require('express').Router();
const Instrument = require('../db');
module.exports = router;

router.get('/products', async (req, res, next) => {
  try {
    const products = await Instrument.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});
