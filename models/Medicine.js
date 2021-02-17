const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: String,
  medicineSupplier: String,
  images: [String],
  weight: Number,
  preservationMethod: String,
  medicineSupplierAddress: String,
  importDate: String,
  manufactureDate: String,
  expiryDate: String,
  farmId: String,
});

module.exports =
  mongoose.models.Medicine || mongoose.model("Medicine", MedicineSchema);
