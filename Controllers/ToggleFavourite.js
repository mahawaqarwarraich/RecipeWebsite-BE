const express = require('express');
const myRouter = express.Router();
const Recipe = require('../Models/recipeModel');

// Endpoint for toggling the isFavourite status of a recipe
myRouter.put('/toggle-favourite/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;

        // Find the recipe by ID
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        // Toggle the isFavourite status
        recipe.isFavourite = !recipe.isFavourite;

        // Save the updated recipe
        await recipe.save();

        res.json({ success: true, message: 'Recipe updated successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = myRouter;

