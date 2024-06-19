const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const userModel = require('../Models/userModel');
const user = require('../Models/userModel')
const bcrypt = require('bcrypt');

router.post('/', [
    body('email', 'email is not valid').isEmail(),
    body('password', 'password cannot be null').exists(),
    body('name', 'name cannot be null').exists()

], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).send({validationError: error.array()})
    }

    try {

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt)

        const data = {
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        }
    
        const newUser = user(data); 
        await newUser.save();

       // const newUser = await user.create(data);

        const resData = {
            message: "Data inserted sucessfully",
            success: true,
            newUser
        }

        res.json(resData)
    } catch(e) {
        console.log('error registering user', e);
    }

})

module.exports = router;