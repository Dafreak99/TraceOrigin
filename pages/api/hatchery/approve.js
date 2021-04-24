import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Hatchery from "models/Hatchery";
import RejectMessage from "models/RejectMessage";

dbConnect();

// @route /api/hatchery/approve
// @desc POST Approve the suggested hatchery from a Farmer

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  switch (method) {
    case "POST":
      try {
        const { hatcheryId } = req.body;

        await Hatchery.findByIdAndUpdate(hatcheryId, {
          "isApproved.status": "true",
          "isApproved.reject": null,
        });

        res.send({ message: "Ok" });
      } catch (error) {
        console.log(error);
        res.send({ message: error.message });
      }
      break;

    default:
      break;
  }
};
