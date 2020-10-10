const mongoose = require("mongoose");
const Seed = require("./Seed");

const FarmSchema = new mongoose.Schema({
  farmName: String,
  farmOwner: String,
  farmImage: [{ type: String }],
  farmAddress: String,
  farmAcreage: String,
  addedBy: String,
  phoneNumber: String,
});

module.exports = mongoose.models.Farm || mongoose.model("Farm", FarmSchema);
