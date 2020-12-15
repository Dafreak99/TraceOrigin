const mongoose = require("mongoose");
const Pond = require("./Pond");

const PondEnvironmentSchema = new mongoose.Schema({
  ngayThangNam: String,
  ao: { type: mongoose.Schema.Types.ObjectId, ref: Pond },
  oxy: Number,
  ph: Number,
  doTrong: Number,
  doMan: Number,
  H2S: Number,
  NH3: Number,
  doKiem: Number,
  farmId: String,
});

module.exports =
  mongoose.models.PondEnvironment ||
  mongoose.model("PondEnvironment", PondEnvironmentSchema);
