const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const alienRouter = require("./routers/users");
const products = require('./routers/products');
const carts = require('./routers/carts');
const category = require('./routers/categories');
const url = 'mongodb://localhost:27017/ShoppingHall'

const app = express()

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('Get connected');
})
// app.use(express.json());

app.use('/users', alienRouter);
app.use('/products', products);
app.use('/categries', category);
app.use('/carts', carts);

app.listen(9000, () => {
    console.log("Server Started");
})