const mongoose = require("mongoose");

const SeedSchema = new mongoose.Schema({
  seedName: String,
  seedQuantity: String,
  seedFarmName: String,
  seedFarmAddress: String,
  seedImportDate: String,
  seedAge: String,
  pondId: String,
  cultivateDate: String,
  harvestDate: String,
});

module.exports = mongoose.models.Seed || mongoose.model("Seed", SeedSchema);

// Seed.findOne({ pondId: "b170472727" });

// vì là unique nên k sợ trùng như khi sử dụng tên
