const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: String,
  productPrice: String,
  unit: String,
  image: String,
  weight: String,
  cultivateDate: String,
  harvestDate: String,
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
  },
  seed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seed",
  },
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
