const mongoose = require("mongoose");

const PackingSchema = new mongoose.Schema({
  packingMethod: String,
  description: String,
  farmId: String,
});

module.exports =
  mongoose.models.Packing || mongoose.model("Packing", PackingSchema);
