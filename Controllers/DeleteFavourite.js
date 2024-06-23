const express = require('express');
const router = express.Router();
const favouriteModel = require('../Models/favouriteModel'); // Assuming you have a Favourite model


// Delete favourite recipe by recipe ID
router.delete('/:recipeId', async (req, res) => {
  const { recipeId } = req.params;

  try {
    const result = await favouriteModel.findOneAndDelete({ recipeId});

    if (!result) {
      return res.status(404).json({ success: false, message: 'Favourite not found' });
    }

    res.status(200).json({ success: true, message: 'Removed from favourites' });
  } catch (error) {
    console.error('Error deleting favourite:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
