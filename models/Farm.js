const mongoose = require("mongoose");
const EnterpriseAuthentication = require("./EnterpriseAuthentication");

const FarmSchema = new mongoose.Schema({
  tenCoSoNuoi: String,
  tenChuCoSoNuoi: String,
  hinhAnh: [{ type: String }],
  diaChi: String,
  dienTich: String,
  sdt: String,
  themVaoBoi: String,
  toaDo: String,
  banDo: String,
  email: String,
  fax: String,
  website: String,
  MST: String,
  moTa: String,
  chungThuc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: EnterpriseAuthentication,
    default: null,
  },
});

module.exports = mongoose.models.Farm || mongoose.model("Farm", FarmSchema);
