const mongoose = require("mongoose");

const RejectMessageSchema = new mongoose.Schema({
  message: String,
  type: String,
  createdAt: String,
});

module.exports =
  mongoose.models.RejectMessage ||
  mongoose.model("RejectMessage", RejectMessageSchema);
