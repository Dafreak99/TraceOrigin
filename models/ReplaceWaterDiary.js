const mongoose = require("mongoose");
const Farm = require("./Farm");
const Pond = require("./Pond");

const ReplaceWaterSchema = new mongoose.Schema({
  createdDate: String,
  percentage: Number,
  pond: { type: mongoose.Schema.Types.ObjectId, ref: Pond },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: Farm },
  productId: String,
  isDone: Boolean,
});

module.exports =
  mongoose.models.ReplaceWater ||
  mongoose.model("ReplaceWater", ReplaceWaterSchema);
