const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  tenThucAn: String,
  ngayNhap: String,
  donViCungCapThucAn: String,
  soLuong: Number,
  ngaySanXuat: String,
  hanSuDung: String,
  hinhAnh: [String],
  farmId: String,
});

module.exports = mongoose.models.Food || mongoose.model("Food", FoodSchema);
