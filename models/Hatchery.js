const mongoose = require("mongoose");

const HatcherySchema = new mongoose.Schema({
  tenTraiGiong: String,
  diaChiTraiGiong: String,
  businessId: String,
});

module.exports =
  mongoose.models.Hatchery || mongoose.model("Hatchery", HatcherySchema);
