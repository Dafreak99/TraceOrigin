const mongoose = require("mongoose");
const Seed = require("./Seed");

const FeedingDiarySchema = new mongoose.Schema({
  ghiChu: String,
  ngayThangNam: String,
  ao: { type: mongoose.Schema.Types.ObjectId, ref: "Pond" },
  khoiLuong: String,
  thucAn: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
});

module.exports =
  mongoose.models.FeedingDiary ||
  mongoose.model("FeedingDiary", FeedingDiarySchema);
