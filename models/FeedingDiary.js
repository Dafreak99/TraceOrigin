const mongoose = require("mongoose");
const Farm = require("./Farm");
const Food = require("./Food");
const Pond = require("./Pond");

const FeedingDiarySchema = new mongoose.Schema({
  ghiChu: String,
  ngayThangNam: String,
  khoiLuong: Number,
  ao: { type: mongoose.Schema.Types.ObjectId, ref: Pond },
  thucAn: { type: mongoose.Schema.Types.ObjectId, ref: Food },
  coSoNuoi: { type: mongoose.Schema.Types.ObjectId, ref: Farm },
  isDone: Boolean,
});

module.exports =
  mongoose.models.FeedingDiary ||
  mongoose.model("FeedingDiary", FeedingDiarySchema);
