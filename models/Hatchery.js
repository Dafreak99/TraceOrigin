const mongoose = require("mongoose");

const HatcherySchema = new mongoose.Schema({
  tenTraiGiong: String,
  diaChiTraiGiong: String,
  farmId: String,
});

module.exports =
  mongoose.models.Hatchery || mongoose.model("Hatchery", HatcherySchema);
