const mongoose = require("mongoose");
const Seed = require("./Seed");

const PondSchema = new mongoose.Schema({
  name: String,
  stockingDensity: String,
  area: String,
  code: String,
  farmId: String,
  seed: { type: mongoose.Schema.Types.ObjectId, ref: Seed },
  isArchived: { type: Boolean, default: false },
});

module.exports = mongoose.models.Pond || mongoose.model("Pond", PondSchema);
