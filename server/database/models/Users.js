const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: String,
  username: String,
  picture: String,
});

module.exports = mongoose.model('users', userSchema);
