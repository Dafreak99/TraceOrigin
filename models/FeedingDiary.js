const mongoose = require("mongoose");
const Farm = require("./Farm");
const Food = require("./Food");
const Pond = require("./Pond");

const FeedingDiarySchema = new mongoose.Schema({
  ghiChu: String,
  ngayThangNam: String,
  khoiLuong: String,
  thucAn: { type: mongoose.Schema.Types.ObjectId, ref: Food },
  ao: { type: mongoose.Schema.Types.ObjectId, ref: Pond },
  coSoNuoi: { type: mongoose.Schema.Types.ObjectId, ref: Farm },
});

module.exports =
  mongoose.models.FeedingDiary ||
  mongoose.model("FeedingDiary", FeedingDiarySchema);
