const mongoose = require("mongoose");

const EnterpriseAuthenticationSchema = new mongoose.Schema({
  hinhAnh: [{ type: String }],
});

module.exports =
  mongoose.models.EnterpriseAuthentication ||
  mongoose.model("EnterpriseAuthentication", EnterpriseAuthenticationSchema);
