const mongoose = require("mongoose");
const Hatchery = require("./Hatchery");

const SeedSchema = new mongoose.Schema({
  quantity: String,
  importDate: String,
  stockingDate: String,
  seedAge: String,
  pondId: String,
  hatchery: { type: mongoose.Schema.Types.ObjectId, ref: Hatchery },
  isDone: Boolean,
  isRegistered: { type: Boolean, default: false },
});

module.exports = mongoose.models.Seed || mongoose.model("Seed", SeedSchema);
