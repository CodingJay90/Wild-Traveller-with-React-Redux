const mongoose = require('mongoose')
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email"],
    validate: [isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [5, "Password shouldn't be less than six characters long"],
  },
  gender: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);