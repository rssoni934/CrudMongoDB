const express = require('express')
const router = express.Router()
const Aliens = require('../models/cart')
// const cat = require('../models/category')

router.get('/', async (req, res) => {
    try {
        console.log('Get Request');
        const alien = await Aliens.find();
        res.send(alien);
    } catch (error) {
        console.log("error " + error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        console.log('Get Request');
        const alien = await Aliens.find({userId:req.params.id});
        res.send(alien);
    } catch (error) {
        console.log("error " + error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        console.log('Get Request');
        const alien = await Aliens.findByIdAndDelete(req.params.id);
        res.send(alien);
    } catch (error) {
        console.log("error " + error);
    }
})

router.post('/',async(req,res)=>{
    const alien = new Aliens({
        name: req.body?.name ?? '',
        category: req.body?.category ?? '',
        productId: req.body?.productId ?? '',
        userId: req.body?.userId ?? ''
    })
    
    try {
        const a1 = await alien.save();
        res.send(a1)
    } catch (error) {
        res.send('Error '+error);
    }
})

router.patch('/:id',async(req,res)=>{
    try {
        const alien = await Aliens.findById(req.params.id);
        if (req.body.productId) {
            alien.productId = req.body.productId;
        }

        if (req.body.category) {
            alien.category = req.body.category;
        }

        if (req.body.userId) {
            alien.userId = req.body.userId;
        }

        if (req.body.name) {
            alien.name = req.body.name;
        }

        const a1 = await alien.save();
        res.send(a1);

    } catch (error) {
        res.send('Error '+error);
    }
})

module.exports = router