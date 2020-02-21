const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  department: String,
  description: String,
  publishedPosts: Array
  
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
