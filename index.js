const connectToMongo = require('./db.js');
connectToMongo();

const express = require('express');
const cors = require('cors');

const app = express();

const port = 8080;

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to send cookies or other credentials
    optionsSuccessStatus: 204
};
  
  app.use(cors(corsOptions));

//app.use(cors());
app.use(express.json());

// Route for getting all recipes
app.use('/recipe', require('./Controllers/all-recipes.js'))

// Route for getting single recipe
app.use('/recipe', require('./Controllers/single-recipe.js'))

// Route for toggling the favourite attribute
app.use('/recipe', require('./Controllers/toggleFavourite.js'))


// Route for getting favourite recipes
app.use('/recipe', require('./Controllers/GetFavouriteRecipes.js'))


// Route for registering the user
app.use('/user/register-user', require('./Controllers/register-user.js'));

// Route for deleting the user
app.use('/user/delete-user', require('./Controllers/delete-user.js'))

// Router for updating user
app.use('/user/update-user', require('./Controllers/update-user.js'))


app.listen(port)
