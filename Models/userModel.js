const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    // Any format that can be converted into string is acceptable for type: string
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
