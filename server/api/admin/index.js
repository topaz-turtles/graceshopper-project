const router = require("express").Router();
const { models: { User } } = require('../../db')
module.exports = router;

router.use( async (req,res,next)=>{
    try {
        const user = await User.findByToken(req.headers.authorization)
        if(user.isAdmin){
            next()
        }else{
            const error = Error("Access Denied.")
            error.status = 401
            throw error
        }
    } catch (error) {
        next(error)
    }
})

router.use('/users', require('./users'));
router.use('/products', require('./products'));