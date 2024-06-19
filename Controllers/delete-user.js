const express = require('express');
const myRouter = express.Router();
const user = require('../Models/userModel')

myRouter.delete('/:id', async (req, res) => {
        const {id} = req.params;

        try {
            const userToDelete = await user.findById({_id: id});

            if (!userToDelete) {
                res.status(400).send({sucess: false, message: 'user not found'})
            }

            const dltUser = await user.findByIdAndDelete(id)

            res.json({
                deletedUser: dltUser,
                success: true
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({success: false, message: 'internal server error'});
        } 
})

module.exports = myRouter;

