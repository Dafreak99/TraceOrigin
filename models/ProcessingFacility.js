const mongoose = require("mongoose");

const ProcessingFacilitySchema = new mongoose.Schema({
  name: String,
  address: String,
  coordinate: String,
  map: String,
  images: [{ type: String }],
  farmId: String,
});

module.exports =
  mongoose.models.ProcessingFacility ||
  mongoose.model("ProcessingFacility", ProcessingFacilitySchema);
