const mongoose = require("mongoose");

const HatcherySchema = new mongoose.Schema({
  name: String,
  address: String,
  farmId: String,
  coordinate: { latitude: Number, longitude: Number },
});

module.exports =
  mongoose.models.Hatchery || mongoose.model("Hatchery", HatcherySchema);
