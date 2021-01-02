const mongoose = require("mongoose");

const ProcessingFacilitySchema = new mongoose.Schema({
  tenCoSoCheBien: String,
  diaChiCoSoCheBien: String,
  businessId: String,
});

module.exports =
  mongoose.models.ProcessingFacility ||
  mongoose.model("ProcessingFacility", ProcessingFacilitySchema);
