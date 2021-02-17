const mongoose = require("mongoose");
const Farm = require("./Farm");

const WarehouseSchema = new mongoose.Schema({
  name: String,
  code: String,
  phone: String,
  email: String,
  address: String,
  businessId: String,
});

module.exports =
  mongoose.models.Warehouse || mongoose.model("Warehouse", WarehouseSchema);
