const mongoose = require("mongoose");

const PondSchema = new mongoose.Schema({
  farmId: String,
  pondAcreage: String,
  pondCode: String,
  pondName: String,
  stockingDensity: String,
  seed: { type: mongoose.Schema.Types.ObjectId, ref: "Seed" },
});

module.exports = mongoose.models.Pond || mongoose.model("Pond", PondSchema);
