const mongoose = require("mongoose");
const User = require("./User");

const HatcherySchema = new mongoose.Schema({
  name: String,
  address: String,
  isApproved: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
  coordinate: { latitude: Number, longitude: Number },
});

module.exports =
  mongoose.models.Hatchery || mongoose.model("Hatchery", HatcherySchema);
