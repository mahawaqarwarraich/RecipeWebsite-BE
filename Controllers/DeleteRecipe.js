const express = require('express');
const myRouter = express.Router();
const Recipe = require('../Models/recipeModel');


// New endpoint for getting a single recipe by ID
myRouter.delete('/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const result = await Recipe.findByIdAndDelete({_id: recipeId});
        console.log('result', result)
        // if (!recipe) {
        //     return res.status(404).json({ success: false, message: 'Recipe not found' });
        // }

        // res.json({
        //     data: recipe,
        //     success: true
        // });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = myRouter;