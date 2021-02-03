const mongoose = require("mongoose");

const ProcessingFacilitySchema = new mongoose.Schema({
  tenCoSoCheBien: String,
  diaChiCoSoCheBien: String,
  toaDo: String,
  banDo: String,
  hinhAnh: [{ type: String }],
  farmId: String,
});

module.exports =
  mongoose.models.ProcessingFacility ||
  mongoose.model("ProcessingFacility", ProcessingFacilitySchema);
