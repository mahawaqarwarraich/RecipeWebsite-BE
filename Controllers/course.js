const express = require('express');
const myRouter = express.Router();

myRouter.get('/', (req, res) => {
    res.send("Course of web development")
})

module.exports = myRouter;

