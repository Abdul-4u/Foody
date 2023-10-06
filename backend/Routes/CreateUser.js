const express = require('express');
const router = express.Router();

const User = require('../models/Users');

const { body, validationResult } = require('express-validator');

router.post('/createuser',
    [body('email', 'incorrect email').isEmail(),
    body('name', 'incorrect name').isLength({ min: 6 }),
    body('passward', 'incorrect passward').isLength({ min: 4 })]

    , async (req, res) => {
        console.log(req.body.name,
            req.body.location,
            req.body.email,
            req.body.passward);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        //making static schemma/dataas 
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                passward: req.body.passward

            }).then(res.json({ success: true }))


        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })







router.post('/loginuser', [body('email', 'incorrect email').isEmail(),

body('passward', 'incorrect passward').isLength({ min: 4 })]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        let email = req.body.email;
        //making static schemma/dataas 
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ error: "Wrong email id" })


            }

            if (req.body.passward !== userData.passward) {
                return res.status(400).json({ error: "Wrong passward" })

            }

            return res.json({ success: true, message: "login success" })
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })
//exporting
module.exports = router;