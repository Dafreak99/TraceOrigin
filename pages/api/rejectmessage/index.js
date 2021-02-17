import dbConnect from "../../../lib/dbConnect";
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
    case "POST":
      // When Quality Control reject Farm Authentication
      try {
        const { type, farmId } = req.body;

        if (type === "Enterprise Authentication") {
          let farm = await Farm.findOne({ _id: farmId });

          await Farm.findOneAndUpdate(
            { _id: farmId },
            { isAuthenticated: "false", authentication: null }
          );

          // Remove Enterprise Authentication
          await EnterpriseAuthentication.findByIdAndRemove(farm.authentication);

          let rejectMessage = new RejectMessage(req.body);

          await rejectMessage.save();
        }

        res.send({ message: "OK" });
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
      break;
    case "DELETE":

    default:
      break;
  }
};
