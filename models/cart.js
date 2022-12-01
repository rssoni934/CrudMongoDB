const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('carts',alienSchema)