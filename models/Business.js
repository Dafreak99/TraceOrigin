const mongoose = require("mongoose");
const Farm = require("./Farm");

const BusinessSchema = new mongoose.Schema({
  tenDoanhNghiep: String,
  diaChi: String,
  hinhAnh: [{ type: String }],
  sdt: String,
  toaDo: Object,
  farm: { type: mongoose.Schema.Types.ObjectId, ref: Farm },
  themVaoBoi: String,
});

module.exports =
  mongoose.models.Business || mongoose.model("Business", BusinessSchema);
