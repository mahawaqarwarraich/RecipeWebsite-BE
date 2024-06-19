const express = require('express');
const myRouter = express.Router();

myRouter.get('/', (req, res)=>{
    res.json({
        srNo: 1,
        course: 'web dev',
        creditHours: '3'
    })
})

module.exports = myRouter;