const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Aliens = require('../models/user')
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require("../validation/login");

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

// router.post('/',async(req,res)=>{
//     const alien = new Aliens({
//         name: req.body?.name ?? '',
//         tech: req.body?.tech ?? '',
//         sub: req.body?.sub
//     })
//     try {
//         const a1 = await alien.save()
//         res.send(a1)
//     } catch (error) {
//         res.send('Error '+error);
//     }
// })

router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.patch('/:id', async (req, res) => {
    try {
        const alien = await Aliens.findById(req.params.id);
        if (req.body.sub) {
            alien.sub = req.body.sub;
        }

        if (req.body.name) {
            alien.name = req.body.name;
        }

        if (req.body.tech) {
            alien.tech = req.body.tech;
        }

        const a1 = await alien.save();
        res.send(a1);

    } catch (error) {
        res.send('Error ' + error);
    }
})

module.exports = router