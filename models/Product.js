const mongoose = require("mongoose");
const Farm = require("./Farm");
const FeedingDiary = require("./FeedingDiary");
const Pond = require("./Pond");
const UsingMedicine = require("./UsingMedicine");

const ProductSchema = new mongoose.Schema({
  tenSanPham: String,
  giaSanPham: String,
  donvi: String,
  hinhAnh: [String],
  trongLuong: String,
  ngayThuHoach: String,
  pond: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Pond,
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Farm,
  },
  feeding: [{ type: mongoose.Schema.Types.ObjectId, ref: FeedingDiary }],
  usingMedicine: [{ type: mongoose.Schema.Types.ObjectId, ref: UsingMedicine }],
  processingFacility: String,
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
