const express = require('express');
const myRouter = express.Router();
const Recipe = require('../Models/recipeModel');


// New endpoint for getting a single recipe by ID
myRouter.get('/single-recipe/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        res.json({
            data: recipe,
            success: true
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = myRouter;