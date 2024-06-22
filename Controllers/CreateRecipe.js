const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Recipe = require('../Models/recipeModel'); // Import the Recipe model

router.post('/create-recipe', [
  body('recipeName', 'Recipe name cannot be null').exists(),
  body('ingredients', 'Ingredients cannot be null and must be an array').isArray(),
  body('method', 'Method cannot be null and must be an array').isArray()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationError: errors.array() });
  }

  try {
    const { recipeName, ingredients, method } = req.body;
    const userId = req.user.id; // Assuming userId is available from authentication

    // Create a new recipe instance
    const newRecipe = new Recipe({
      userId,
      recipeName,
      ingredients,
      method
    });

    // Save the recipe to the database
    await newRecipe.save();

    // Response data
    const responseData = {
      message: "Recipe created successfully",
      success: true,
      newRecipe
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
