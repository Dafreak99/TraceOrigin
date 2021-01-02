const mongoose = require("mongoose");
const Hatchery = require("./Hatchery");

const SeedSchema = new mongoose.Schema({
  soLuongConGiong: String,
  ngayThaGiong: String,
  ngayTuoiGiong: String,
  pondId: String,
  traiGiong: { type: mongoose.Schema.Types.ObjectId, ref: Hatchery },
});

module.exports = mongoose.models.Seed || mongoose.model("Seed", SeedSchema);
