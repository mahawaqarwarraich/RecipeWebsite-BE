const express = require('express');
const myRouter = express.Router();
const recipe = require('../Models/recipeModel');

myRouter.get('/all-recipes', async (req, res) => {
    try {
        // Extract page number and page size from query parameters
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10; // Default page size of 10 if not provided

        // Calculate skip value based on page number and page size
        const skip = (page - 1) * pageSize;

        // Fetch recipes from database with pagination
        const recipes = await recipe.find().skip(skip).limit(pageSize);

        const totalRecipes = await recipe.countDocuments();

        

        res.json({
            data: recipes,
            totalRecipes: totalRecipes,
            success: true
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = myRouter;
