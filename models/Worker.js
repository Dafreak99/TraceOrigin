const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
  hoTen: String,
  diaChi: String,
  soCMND: String,
  namSinh: String,
  gioiTinh: String,
  bangCap: String,
  nhiemVu: String,
  farmId: String,
});

module.exports =
  mongoose.models.Worker || mongoose.model("Worker", WorkerSchema);
