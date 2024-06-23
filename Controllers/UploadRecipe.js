const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); 

const router = express.Router();

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'RecipeWebApp', // Folder name in Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => file.originalname.split('.')[0] + '-' + Date.now(),
  },
});

const upload = multer({ storage });

// Your Recipe model
const Recipe = require('../Models/recipeModel');

// POST /recipes - Create a new recipe
router.post('/', upload.single('img'), async (req, res) => {
  try {
    const { name, ingredients, method, userId } = req.body;

    // Parse ingredients and method from JSON strings
    const parsedIngredients = JSON.parse(ingredients);
    const parsedMethod = JSON.parse(method);

    // Create a new recipe object
    const newRecipe = new Recipe({
    userId,
      name,
      ingredients: parsedIngredients,
      method: parsedMethod,
      img: req.file ? req.file.path : null, // Storing the URL of the uploaded image
    });

    // Save the recipe to the database
    await newRecipe.save();

    res.status(201).json({ success: true, message: 'Recipe uploaded successfully!', recipe: newRecipe });
  } catch (error) {
    console.error('Error uploading recipe:', error);
    res.status(500).json({ message: 'Failed to upload recipe.', error });
  }
});

module.exports = router;
