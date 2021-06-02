const mongoose = require("mongoose");
const Farm = require("./Farm");
const Food = require("./Food");
const Medicine = require("./Medicine");
const Pond = require("./Pond");
const Worker = require("./Worker");

const UsingMedicineSchema = new mongoose.Schema({
  createdDate: String,
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: Medicine },
  food: { type: mongoose.Schema.Types.ObjectId, ref: Food },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: Worker },
  pond: { type: mongoose.Schema.Types.ObjectId, ref: Pond },
  mixingRatio: String,
  weight: Number,
  farm: { type: mongoose.Schema.Types.ObjectId, ref: Farm },
  productId: String,
  isDone: Boolean,
});

module.exports =
  mongoose.models.UsingMedicine ||
  mongoose.model("UsingMedicine", UsingMedicineSchema);
