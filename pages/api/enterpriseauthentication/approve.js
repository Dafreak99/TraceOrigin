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

  let farm = await Farm.findOne({ createdBy: decoded });

  switch (method) {
    case "POST":
      const { farmId } = req.body;

      await Farm.findOneAndUpdate({ _id: farmId }, { isAuthenticated: "true" });

      res.send({ message: "OK" });
      break;

    default:
      break;
  }
};
