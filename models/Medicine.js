const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  tenThuoc: String,
  donViCungCapThuoc: String,
  hinhAnh: [String],
  soLuong: Number,
  cachBaoQuan: String,
  diaChiDonViCungCapThuoc: String,
  ngayNhap: String,
  ngaySanXuat: String,
  hanSuDung: String,
  farmId: String,
});

module.exports =
  mongoose.models.Medicine || mongoose.model("Medicine", MedicineSchema);
