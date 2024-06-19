const express = require('express');
const myRouter = express.Router();

myRouter.get('/', (req, res) => {
    res.send('Result of web exercises');
})

module.exports = myRouter;