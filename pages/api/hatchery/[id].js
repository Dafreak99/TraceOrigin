import dbConnect from "@/lib/dbConnect";

import Hatchery from "models/Hatchery";
import Farm from "models/Farm";
import RejectMessage from "models/RejectMessage";

dbConnect();

// @route /api/hatchery/:id
// @desc Get detail information of a specific hatchery

export default async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.query;

  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  switch (method) {
    case "GET":
      const hatchery = await Hatchery.findById(id);
      const farm = await Farm.findOne({ createdBy: hatchery.createdBy });

      res.send({ hatchery, farm });
      break;

    case "POST":
      const { resolveType } = req.body; // Either Approve or Reject

      try {
        if (resolveType === "approve") {
          await Hatchery.findByIdAndUpdate(id, {
            "isApproved.status": "true",
            "isApproved.reject": null,
          });
        } else {
          const { message, type, createdAt } = req.body;

          const rejectMessage = new RejectMessage({ message, type, createdAt });
          rejectMessage.save();

          await Hatchery.findByIdAndUpdate(id, {
            "isApproved.status": "false",
            "isApproved.reject": rejectMessage,
          });
        }

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
