import dbConnect from "@/lib/dbConnect";
dbConnect();

import jwt from "jsonwebtoken";

import Farm from "../../../models/Farm";

import RejectMessage from "models/RejectMessage";
import EnterpriseAuthentication from "models/EnterpriseAuthentication";

// @route /api/rejectmessage

export default async (req, res) => {
  const { method } = req;
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  switch (method) {
    case "GET":
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      let farm = await Farm.findOne({ createdBy: decoded });

      let rejectMessage = await RejectMessage.findOne({ farmId: farm._id });

      res.send(rejectMessage);

      break;

    default:
      break;
  }
};
