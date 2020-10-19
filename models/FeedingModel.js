const mongoose = require("mongoose");
const Seed = require("./Seed");

const FeedingDiarySchema = new mongoose.Schema({
  ngayThangNam: String,
  tenAo: String,
  khoiLuongChoAn: String,
  thucAn: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
});

module.exports =
  mongoose.models.FeedingDiary ||
  mongoose.model("FeedingDiary", FeedingDiarySchema);
