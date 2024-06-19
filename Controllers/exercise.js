const express = require('express');
const myRouter = express.Router();

myRouter.get('/e1', (req, res) => {
    res.send('Exercises of web development');
})


module.exports = myRouter;