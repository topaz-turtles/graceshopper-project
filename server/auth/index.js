const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const loginInfo = {username: req.body.username, password: req.body.password}
    res.send({ token: await User.authenticate(loginInfo) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const signUpInfo = { username: req.body.username, password: req.body.password, email: req.body.email}
    const user = await User.create(signUpInfo);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.get('/admin', async (req, res, next) =>{
  try{
    const user = await User.findByToken(req.headers.authorization)
    res.send(user.isAdmin)
  }catch(error){
    next(error)
  }
})
