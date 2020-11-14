const mongoose = require("mongoose");
const Farm = require("./Farm");
const FeedingDiary = require("./FeedingDiary");
const Pond = require("./Pond");

const ProductSchema = new mongoose.Schema({
  tenSanPham: String,
  giaSanPham: String,
  unit: String,
  hinhAnh: [String],
  khoiLuong: String,
  pond: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Pond,
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Farm,
  },
  feedingDiary: [{ type: mongoose.Schema.Types.ObjectId, ref: FeedingDiary }],
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
