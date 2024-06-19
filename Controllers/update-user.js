const express = require('express');
const myRouter = express.Router();
const user = require('../Models/userModel')

myRouter.post('/:id', async (req, res) => {
        const {id} = req.params;

        try {
            const userToUpdate = await user.findById({_id: id});

            if (!userToUpdate) {
                res.status(400).send({sucess: false, message: 'user not found'})
            }

        const newData = {}
           newData.name = req.body.newName;
           newData.fname = req.body.newfName

            const updatedUser = await user.findByIdAndUpdate(id, {$set: newData}, {new: true})

            res.json({
                updatedUser,
                success: true
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({success: false, message: 'internal server error'});
        } 
})

module.exports = myRouter;

