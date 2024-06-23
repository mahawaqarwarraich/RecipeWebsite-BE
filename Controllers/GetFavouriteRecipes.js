const express = require('express');
const myRouter = express.Router();
const favouriteModel = require('../Models/favouriteModel'); // Assuming this is correctly imported

myRouter.get('/favourite-recipes/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            console.log('user id is required');
            return;
        }
        console.log("yeh hai bhaee user id", userId)

        // Validate userId if necessary (e.g., check if it's a valid format)

        // Extract page number and page size from query parameters
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10; // Default page size of 10 if not provided

        // Calculate skip value based on page number and page size
        const skip = (page - 1) * pageSize;

        // Fetch only recipeId column from favourites for the specified userId with pagination
        const favourites = await favouriteModel.find({ userId})
                                               .select('recipeId') // Select only recipeId field
                                               .skip(skip)
                                               .limit(pageSize);

        // Count total number of favourites for the user
        const totalFavourites = await favouriteModel.countDocuments({ userId });

        res.json({
            data: favourites,
            totalFavourites: totalFavourites,
            success: true
        });
    } catch (error) {
        console.error('Error fetching favourite recipes:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = myRouter;
