const mongoose = require("mongoose");
const Product = require("./Product");

const ConsignmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  coordinate: { latitude: Number, longitude: Number },
});

module.exports =
  mongoose.models.Consignment ||
  mongoose.model("Consignment", ConsignmentSchema);
