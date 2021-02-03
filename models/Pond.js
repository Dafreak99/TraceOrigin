const mongoose = require("mongoose");
const Seed = require("./Seed");

const PondSchema = new mongoose.Schema({
  tenAo: String,
  matDoTha: String,
  dienTich: String,
  maAo: String,
  farmId: String,
  seed: { type: mongoose.Schema.Types.ObjectId, ref: Seed },
  luuTru: { type: Boolean, default: false },
});

module.exports = mongoose.models.Pond || mongoose.model("Pond", PondSchema);
