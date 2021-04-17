const mongoose = require("mongoose");
const EnterpriseAuthentication = require("./EnterpriseAuthentication");

const FarmSchema = new mongoose.Schema({
  name: String,
  owner: String,
  images: [{ type: String }],
  address: String,
  area: String,
  phone: String,
  createdBy: String,
  coordinate: { latitude: Number, longitude: Number },
  map: String,
  email: String,
  fax: String,
  website: String,
  MST: String,
  description: String,
  isAuthenticated: { type: String, default: "" },
  authentication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: EnterpriseAuthentication,
    default: null,
  },
});

module.exports = mongoose.models.Farm || mongoose.model("Farm", FarmSchema);
