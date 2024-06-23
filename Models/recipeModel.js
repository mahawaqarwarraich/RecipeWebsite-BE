const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  isFavourite: {
    type: Boolean,
    
  },
  ingredients: {
    type: [String],
    required: true
  },
  method: {
    type: [String],
    required: true
  },
  comments: {
    type: [Schema.Types.ObjectId]
  }
}, { timestamps: true });

const recipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = recipeModel;
