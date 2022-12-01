const express = require('express')
const router = express.Router()
const Aliens = require('../models/product')
const cat = require('../models/category')

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
        const alien = await Aliens.findById(req.params.id);
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
        price: req.body?.price ?? '',
        stock: req.body?.stock ?? ''
    })
    
    const allCategory = await cat.find();
    const categroyAvailable = allCategory.find((cate)=>cate.name.toLowerCase() == req.body.category.toLowerCase());
    console.log(categroyAvailable);
    if(categroyAvailable){  
        console.log("Category already exist",categroyAvailable);
    }else{
        const category = new cat({name:req.body.category});
        await category.save();
    }
    
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
        if (req.body.price) {
            alien.price = req.body.price;
        }

        if (req.body.name) {
            alien.name = req.body.name;
        }

        if (req.body.stock) {
            alien.stock = req.body.stock;
        }

        if (req.body.category) {
            alien.category = req.body.category;
        }

        const a1 = await alien.save();
        res.send(a1);

    } catch (error) {
        res.send('Error '+error);
    }
})

module.exports = router