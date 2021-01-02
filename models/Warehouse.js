const mongoose = require("mongoose");
const Farm = require("./Farm");

const WarehouseSchema = new mongoose.Schema({
  maKho: String,
  tenKho: String,
  sdt: String,
  email: String,
  diaChi: String,
  businessId: String,
});

module.exports =
  mongoose.models.Warehouse || mongoose.model("Warehouse", WarehouseSchema);
