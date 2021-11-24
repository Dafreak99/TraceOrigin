const mongoose = require("mongoose");

const EnterpriseAuthenticationSchema = new mongoose.Schema({
  images: [{ type: String }],
});

module.exports =
  mongoose.models.EnterpriseAuthentication ||
  mongoose.model("EnterpriseAuthentication", EnterpriseAuthenticationSchema);
