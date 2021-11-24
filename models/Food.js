const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: String,
  importDate: String,
  foodSupplier: String,
  foodSupplierAddress: String,
  weight: Number,
  manufactureDate: String,
  expiryDate: String,
  images: [String],
  farmId: String,
});

module.exports = mongoose.models.Food || mongoose.model("Food", FoodSchema);
