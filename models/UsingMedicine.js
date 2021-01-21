const mongoose = require("mongoose");
const Food = require("./Food");
const Medicine = require("./Medicine");
const Pond = require("./Pond");
const Worker = require("./Worker");

const UsingMedicineSchema = new mongoose.Schema({
  ngayThangNam: String,
  thuoc: { type: mongoose.Schema.Types.ObjectId, ref: Medicine },
  thucAn: { type: mongoose.Schema.Types.ObjectId, ref: Food },
  nguoiTron: { type: mongoose.Schema.Types.ObjectId, ref: Worker },
  ao: { type: mongoose.Schema.Types.ObjectId, ref: Pond },
  tyLePhoiTron: String,
  khoiLuongThuoc: Number,
  farmId: String,
  isDone: Boolean,
});

module.exports =
  mongoose.models.UsingMedicine ||
  mongoose.model("UsingMedicine", UsingMedicineSchema);
