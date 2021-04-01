const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  image: String,
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
