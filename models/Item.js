const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: String,
  date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now,
  },
});

module.exports = mongoose.models.Item || mongoose.model("Item", ItemSchema);
