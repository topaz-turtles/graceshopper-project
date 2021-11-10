const router = require("express").Router();
const {
  models: { Instrument },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Instrument.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const products = await Instrument.findByPk(req.params.id);
    res.send(products);
  } catch (error) {
    next(error);
  }
});
