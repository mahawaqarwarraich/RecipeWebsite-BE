const mongoose = require('mongoose');
const { Schema } = mongoose;

const favouriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  recipeId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },
 
  
}, { timestamps: true });

const favouriteModel = mongoose.model('Favourite', favouriteSchema);

module.exports = favouriteModel;
