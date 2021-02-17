import Farm from "../../../models/Farm";
import dbConnect from "../../../lib/dbConnect";

import EnterpriseAuthentication from "../../../models/EnterpriseAuthentication";

import jwt from "jsonwebtoken";
import RejectMessage from "models/RejectMessage";

dbConnect();

// @route /api/enterpriseauthentication
// @desc Get detail authentication of your farm

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "GET":
      try {
        // For Quality Control to get pending Farms waiting for Enterprise Authentication
        let farms = await Farm.find({ isAuthenticated: "pending" });

        res.send(farms);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;
    case "POST":
      // Delete old Reject Message

      await RejectMessage.findOneAndRemove({
        farmId: farm._id,
        type: "Enterprise Authentication",
      });

      let authentication = new EnterpriseAuthentication(req.body);

      await authentication.save();

      await Farm.findByIdAndUpdate(farm._id, {
        isAuthenticated: "pending",
        authentication: authentication._id,
      });
      res.send({ message: "OK" });

      try {
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
      break;

    default:
      break;
  }
};
