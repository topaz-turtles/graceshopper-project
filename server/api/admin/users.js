const router = require('express').Router()
const { models: { User } } = require('../../db')
module.exports = router


router.get('/', async (req,res,next) =>{

    try {
        const users = await User.findAll({
            attributes: {exclude: ['isAdmin', 'orderHistory']},
            order: ['id']
        });
        res.send(users)
    } catch (error) {
        next(error)
    }
    
})