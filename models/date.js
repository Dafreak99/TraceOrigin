const mongoose = require("mongoose");

const DateSchema = new mongoose.Schema({
  title: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.models.Date || mongoose.model("Date", DateSchema);
