const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  tenCoSoNuoi: String,
  tenChuCoSoNuoi: String,
  hinhAnh: [{ type: String }],
  diaChi: String,
  dienTich: String,
  sdt: String,
  themVaoBoi: String,
});

module.exports = mongoose.models.Farm || mongoose.model("Farm", FarmSchema);
