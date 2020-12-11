const mongoose = require("mongoose");
const Medicine = require("./Medicine");
const Pond = require("./Pond");

const PondEnviromentSchema = new mongoose.Schema({
  ngayThangNam: String,
  ao: { type: mongoose.Schema.Types.ObjectId, ref: Pond },
  oxy: String,
  ph: String,
  doTrong: String,
  doMan: String,
  H2S: String,
  NH3: String,
  doKiem: String,
});

module.exports =
  mongoose.models.PondEnviroment ||
  mongoose.model("PondEnviroment", PondEnviromentSchema);
