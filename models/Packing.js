const mongoose = require("mongoose");

const PackingSchema = new mongoose.Schema({
  quyCachDongGoi: String,
  moTa: String,
  businessId: String,
});

module.exports =
  mongoose.models.Packing || mongoose.model("Packing", PackingSchema);
