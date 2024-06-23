const express = require('express');
const router = express.Router();
const userModel = require('../Models/userModel.js');
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

// Register Controller
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        //validation
        if (!username || !password) {
          return res.status(404).send({
            success: false,
            message: "Invalid username or password",
          });
        }
        //check user
        const user = await userModel.findOne({ username});
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "user is not registerd",
          });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(200).send({
            success: false,
            message: "Invalid Password",
          });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, `${process.env.SECRET_KEY}`, {
          expiresIn: "7d",
        });
        res.status(200).send({
          success: true,
          message: "login successfully",
          user: {
            _id: user._id,
            usename: user.name,
           
          },
          token,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in login",
          error,
        });
      }
});

module.exports = router;
