const mongoose = require("mongoose");

const Hatchery = require("./Hatchery");

const SeedSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  importDate: String,
  stockingDate: String,
  seedAge: Number,
  pondId: mongoose.Schema.Types.ObjectId,
  hatchery: { type: mongoose.Schema.Types.ObjectId, ref: Hatchery },
  isDone: Boolean,
  isRegistered: { type: Boolean, default: false },
  farmId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.models.Seed || mongoose.model("Seed", SeedSchema);
