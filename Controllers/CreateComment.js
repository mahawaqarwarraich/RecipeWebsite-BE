// commentRoute.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Comment = require('../Models/commentModel'); // Import the Comment model
const Recipe = require('../Models/recipeModel'); // Import the Recipe model

router.post('/:id/comments', [
  body('recipeId', 'recipeId must be a valid ObjectId').isMongoId(),
  body('text', 'text cannot be null').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ validationError: errors.array() });
  }

  try {
    const { recipeId, text } = req.body;
    const userId = req.user.id; // Assuming userId is available from authentication

    // Create a new comment instance
    const newComment = new Comment({
      userId,
      recipeId,
      text
    });

    // Save the comment to the database
    await newComment.save();

    // Add the comment to the comments array in the recipe document
    const recipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    // Response data
    const responseData = {
      message: "Comment inserted successfully and added to recipe's comments array",
      success: true,
      newComment,
      updatedRecipe: recipe
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
