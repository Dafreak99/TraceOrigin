const mongoose = require("mongoose");
const Farm = require("./Farm");

const BusinessSchema = new mongoose.Schema({
  tenDoanhNghiep: String,
  address: String,
  images: [{ type: String }],
  phone: String,
  coordinate: Object,
  farm: { type: mongoose.Schema.Types.ObjectId, ref: Farm },
  createdBy: String,
});

module.exports =
  mongoose.models.Business || mongoose.model("Business", BusinessSchema);
