const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  farmName: String,
  farmOwner: String,
  farmImage: [{ type: String }],
  address: String,
  acreage: String,
  addedBy: String,
  phoneNumber: String,
});

module.exports = mongoose.models.Farm || mongoose.model("Farm", FarmSchema);
