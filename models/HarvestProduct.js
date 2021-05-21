const mongoose = require("mongoose");

const HarvestProductSchema = new mongoose.Schema({
  harvestedDate: String,
  note: String,
  weight: Number,
  packingMethod: String,
  // consumption: {
  //   name: String,
  //   phone: String,
  //   address: String,
  //   coordinate: { latitude: Number, longitude: Number },
  // },
});

module.exports =
  mongoose.models.HarvestProduct ||
  mongoose.model("HarvestProduct", HarvestProductSchema);
