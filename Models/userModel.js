const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    // Any format that can be converted into string is acceptable for type: string
  name: {
    type: String,
    required: true
  },
  fname: {
    type: String,
  },
  status: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
