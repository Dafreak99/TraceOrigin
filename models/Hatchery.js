const mongoose = require("mongoose");

const HatcherySchema = new mongoose.Schema({
  name: String,
  address: String,
  coordinate: String,
  map: String,
  images: [{ type: String }],
  farmId: String,
});

module.exports =
  mongoose.models.Hatchery || mongoose.model("Hatchery", HatcherySchema);
