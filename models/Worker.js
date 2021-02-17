const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
  name: String,
  address: String,
  idCard: String,
  phone: String,
  dateOfBorn: String,
  gender: String,
  degree: String,
  responsibility: String,
  farmId: String,
});

module.exports =
  mongoose.models.Worker || mongoose.model("Worker", WorkerSchema);
