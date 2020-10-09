const mongoose = require("mongoose");

const PondSchema = new mongoose.Schema({
  farmId: String,
  pondAcreage: String,
  pondCode: String,
  pondDate: String,
  pondName: String,
  pondQuantity: String,
});

module.exports = mongoose.models.Pond || mongoose.model("Pond", PondSchema);
