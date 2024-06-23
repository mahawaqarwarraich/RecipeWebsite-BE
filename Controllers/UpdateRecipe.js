const express = require('express');
const router = express.Router();


// Your Recipe model
const Recipe = require('../Models/recipeModel');

// PUT /recipes/:id - Update a recipe by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, method } = req.body;

    // Parse ingredients and method from JSON strings
    // const parsedIngredients = JSON.parse(ingredients);
    // const parsedMethod = JSON.parse(method);

    // Find recipe by ID and update
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, {
      name: name,
      ingredients: ingredients,
      method: method,
    }, {
      new: true, // To return the updated document
    });

    if (!updatedRecipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    res.status(200).json({ success: true, message: 'Recipe updated successfully!', recipe: updatedRecipe });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Failed to update recipe.', error });
  }
});

module.exports = router;
