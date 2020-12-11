const mongoose = require("mongoose");

// Biểu 8. Theo dõi nhập thuốc thú y, hóa chất, chế phẩm sinh học

const Bieu8Schema = new mongoose.Schema({
  ngayThangNam: String,
  tenHoaChat: String,
  soLuong: String,
  donViBan: String,
  diaChiDonViBan: String,
  soLo: String,
  hanSuDung: String,
  cachBaoQuan: String,
  ghiChu: String,
});

module.exports = mongoose.models.Bieu8 || mongoose.model("Bieu8", Bieu8Schema);
