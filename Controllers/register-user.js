const express = require('express');
const router = express.Router();
const userModel = require('../Models/userModel.js');
const bcrypt = require("bcrypt")

// Register Controller
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validations
    if (!username) {
      return res.status(400).send({ error: 'Username is Required' });
    }

    if (!password) {
      return res.status(400).send({ error: 'Password is Required' });
    }

    // Check if user exists
    const existingUser = await userModel.findOne({ username });

    // Existing user
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: 'User already exists. Please login.',
      });
    }
    const mySalt = await bcrypt.genSalt(10) //Salt value for 10 characters
    let hashedPassword = await bcrypt.hash(password, mySalt)
    



    // Create new user
    const newUser = new userModel({
      username,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user: savedUser,
    });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error: error.message,
    });
  }
});

module.exports = router;
