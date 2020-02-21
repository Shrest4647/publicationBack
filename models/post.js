const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  // id: {type: String, required: true, unique: true},
  publicationType: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  publisher: String,
  placeOfPublication: String,
  coAuthors: Array,
  content: String,
  link: String,
  attachment: String,
  views: Number
});

module.exports = mongoose.model("Post", postSchema);