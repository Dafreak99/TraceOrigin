const mongoose = require("mongoose");

const SeedSchema = new mongoose.Schema({
  tenCongiong: String,
  soLuongConGiong: String,
  tenTraiGiong: String,
  diaChiTraiGiong: String,
  ngayThaGiong: String,
  ngayThuHoach: String,
  ngayTuoiGiong: String,
  pondId: String,
});

module.exports = mongoose.models.Seed || mongoose.model("Seed", SeedSchema);
