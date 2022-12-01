const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('products',alienSchema)