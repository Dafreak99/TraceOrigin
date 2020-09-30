const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  provider: String,
  uid: String,
  avatar: String,
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
