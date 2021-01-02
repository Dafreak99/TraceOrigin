const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  type: String,
});

// Hash plain text password before save user
UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Password will be cut out
UserSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  // built-in method
  delete userObject.password;

  return userObject;
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
