const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/RecipeDB';


const connectToMongo = async() => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to mongodb');
    } catch(e) {
        console.log('Error connecting to mongodb: ', e.message)
    }
    
}

module.exports = connectToMongo;

