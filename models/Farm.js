const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  farmName: String,
  farmOwner: String,
  farmImage: String,
  address: String,
  acreage: String,
});

module.exports = mongoose.models.Farm || mongoose.model("Farm", FarmSchema);
