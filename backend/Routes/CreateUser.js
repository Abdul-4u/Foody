const express = require('express');
const router = express.Router();

const User = require('../models/Users');

const { body, validationResult } = require('express-validator');


const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const jwtSecret = "this is my secret key"




router.post('/createuser',
    [body('email', 'incorrect email').isEmail(),
    body('name', 'incorrect name').isLength({ min: 5 }),
    body('passward', 'incorrect passward').isLength({ min: 4 })]

    , async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        const salt = await bcrypt.genSalt(10);
        let secPassward = await bcrypt.hash(req.body.passward, salt)
        //making static schemma/dataas 
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                passward: secPassward

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

            const pwdCompare = await bcrypt.compare(req.body.passward, userData.passward)
            if (!pwdCompare) {
                return res.status(400).json({ error: "Wrong passward" })

            }


            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken })
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })
//exporting
module.exports = router;