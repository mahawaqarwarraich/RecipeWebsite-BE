const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  recipeId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true
  }
  
}, { timestamps: true });

const commentModel = mongoose.model('Comment', commentSchema);

module.exports = commentModel;
