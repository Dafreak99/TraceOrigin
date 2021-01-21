const mongoose = require("mongoose");
const Product = require("./Product");

const ConsignmentSchema = new mongoose.Schema({
  maLoHang: String,
  sanPham: { type: mongoose.Schema.Types.ObjectId, ref: Product },
  ngaySanXuat: String,
  businessId: String,
});

module.exports =
  mongoose.models.Consignment ||
  mongoose.model("Consignment", ConsignmentSchema);
