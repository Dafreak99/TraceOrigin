import Farm from "../../../models/Farm";
import Food from "../../../models/Food";
import dbConnect from "@/lib/dbConnect";

import RejectMessage from "models/RejectMessage";

dbConnect();

// @route /api/enterpriseauthentication
// @desc Get detail information of your farm

export default async (req, res) => {
  const token = req.headers.authorization;

  const {
    query: { id },
  } = req;
  const { method } = req;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  switch (method) {
    case "GET":
      let farm = await Farm.findOne({ _id: id }).populate("authentication");

      res.send(farm);

      break;
    case "PUT":
      const { isAuthenticated, farmId } = req.body;

      if (isAuthenticated === "true") {
        await RejectMessage.findOneAndRemove({
          farmId,
          type: "Enterprise Authentication",
        });

        await Farm.findOneAndUpdate({ _id: farmId }, { isAuthenticated });
      }

      res.send({ message: "OK" });

      break;
    default:
      break;
  }
};
