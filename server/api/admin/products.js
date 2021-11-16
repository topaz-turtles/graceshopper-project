const router = require('express').Router()
const { models: { Instrument } } = require('../../db');
module.exports = router


router.get('/', async (req,res,next) =>{

    try {
        const products = await Instrument.findAll({
            attributes: {exclude: ['stock', 'rating','quantity']},
            order: ['id']
        });
        res.send(products)
    } catch (error) {
        next(error)
    }
    
})

router.post('/', async (req,res,next) => {

    try {

        const product = { 
            itemType: req.body.itemType,
            brand: req.body.brand,
            model: req.body.model,
            imageurl: req.body.imageurl,
            description: req.body.description,
            price: Math.max(100,req.body.price)
        }

        await Instrument.create(product)
        res.status(202).send();

    } catch (error) {
        next(error)
    }
})

router.put('/', async (req,res,next)=>{

    try {
        const product = { 
            id: req.body.id, 
            itemType: req.body.itemType,
            brand: req.body.brand,
            model: req.body.model,
            imageurl: req.body.imageurl,
            description: req.body.description,
            price: Math.max(100,req.body.price)
        }

        await Instrument.update(product,{where: {id: product.id}})
        res.status(202).send()
    } catch (error) {
        next(error)
    }
})

router.delete("/", async (req,res,next)=>{
    try {
        await Instrument.destroy({where:{id:req.body.id}})
        res.status(202).send()
    } catch (error) {
        next(error)
    }
})