const mongoose = require("mongoose");

const PondSchema = new mongoose.Schema({
  tenAo: String,
  matDoTha: String,
  dienTich: String,
  maAo: String,
  farmId: String,
  seed: { type: mongoose.Schema.Types.ObjectId, ref: "Seed" },
});

module.exports = mongoose.models.Pond || mongoose.model("Pond", PondSchema);
