const mongoose = require("mongoose");
const Pond = require("./Pond");

const PondEnvironmentSchema = new mongoose.Schema({
  createdDate: String,
  pond: { type: mongoose.Schema.Types.ObjectId, ref: Pond },
  oxy: Number,
  ph: Number,
  clarity: Number,
  salinity: Number,
  H2S: Number,
  NH3: Number,
  alkalinity: Number,
  farmId: String,
});

module.exports =
  mongoose.models.PondEnvironment ||
  mongoose.model("PondEnvironment", PondEnvironmentSchema);
