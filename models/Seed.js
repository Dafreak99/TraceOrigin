const mongoose = require("mongoose");

const SeedSchema = new mongoose.Schema({
  seedSellerCompanyName: String,
  seedSellerAddress: String,
  seedImportDate: String,
  ageOfSeed: String,
});

module.exports = mongoose.models.Seed || mongoose.model("Seed", SeedSchema);
