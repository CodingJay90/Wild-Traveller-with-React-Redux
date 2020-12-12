const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
    avatar: String
  },
  text: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);