import Farm from "../../../models/Farm";
import dbConnect from "@/lib/dbConnect";

import EnterpriseAuthentication from "../../../models/EnterpriseAuthentication";

import jwt from "jsonwebtoken";
import RejectMessage from "models/RejectMessage";

dbConnect();

// @route /api/enterpriseauthentication/reject
// @desc Reject Enterprise Authentication

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  switch (method) {
    case "POST":
      const { farmId, message, type, createdAt } = req.body;

      const rejectMessage = new RejectMessage({ message, type, createdAt });

      await rejectMessage.save();

      const farm = await Farm.findOne({ _id: farmId });

      await Farm.findOneAndUpdate(
        { _id: farmId },
        {
          isAuthenticated: "false",
          authentication: null,
          reject: rejectMessage,
        }
      );

      // Remove Enterprise Authentication
      await EnterpriseAuthentication.findByIdAndRemove(farm.authentication);
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
