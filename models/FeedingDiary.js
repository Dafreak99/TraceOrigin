const mongoose = require("mongoose");
const Farm = require("./Farm");
const Food = require("./Food");
const Pond = require("./Pond");
const Product = require("./Product");

const FeedingDiarySchema = new mongoose.Schema({
  note: String,
  createdDate: String,
  weight: Number,
  pond: { type: mongoose.Schema.Types.ObjectId, ref: Pond },
  food: { type: mongoose.Schema.Types.ObjectId, ref: Food },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: Farm },
  isDone: Boolean,
});

module.exports =
  mongoose.models.FeedingDiary ||
  mongoose.model("FeedingDiary", FeedingDiarySchema);
