const mongoose = require("mongoose");
const Seed = require("./Seed");

const FoodSchema = new mongoose.Schema({
  tenThucAn: String,
  ngayNhap: String,
  donViCungCapThucAn: String,
  soLuong: String,
  ngaySanXuat: String,
  hanSuDung: String,
  hinhAnh: [String],
  farmId: String,
});

module.exports = mongoose.models.Food || mongoose.model("Food", FoodSchema);
