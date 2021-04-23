const mongoose = require("mongoose");
const User = require("./User");
const RejectMessage = require("./RejectMessage");

const HatcherySchema = new mongoose.Schema({
  name: String,
  address: String,
  isApproved: {
    status: String,
    reject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: RejectMessage,
      default: null,
    },
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
  coordinate: { latitude: Number, longitude: Number },
});

module.exports =
  mongoose.models.Hatchery || mongoose.model("Hatchery", HatcherySchema);
