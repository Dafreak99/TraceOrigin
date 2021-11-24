const mongoose = require("mongoose");

const ConsumptionLocationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  createdBy: String,
  coordinate: {
    latitude: Number,
    longitude: Number,
  },
});

module.exports =
  mongoose.models.ConsumptionLocation ||
  mongoose.model("ConsumptionLocation", ConsumptionLocationSchema);
