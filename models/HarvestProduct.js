const mongoose = require("mongoose");

const HarvestProductSchema = new mongoose.Schema({
  harvestedDate: String,
  note: String,
  weight: Number,
  packingMethod: String,
});

module.exports =
  mongoose.models.HarvestProduct ||
  mongoose.model("HarvestProduct", HarvestProductSchema);
