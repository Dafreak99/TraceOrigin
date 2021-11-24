const mongoose = require("mongoose");
const Pond = require("./Pond");

const NoteSchema = new mongoose.Schema({
  note: String,
  createdDate: String,
  pond: { type: mongoose.Schema.Types.ObjectId, ref: Pond },
  images: [String],
  farmId: String,
  productId: String,
  isDone: { type: Boolean, default: false },
});

module.exports = mongoose.models.Note || mongoose.model("Note", NoteSchema);
