import UsingMedicine from "../../../models/UsingMedicine";
import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/medicine/[id]
// @desc Get detail information of your farm

export default async (req, res) => {
  const token = req.headers.authorization;

  const { method } = req;
  const {
    query: { id },
  } = req;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  switch (method) {
    case "GET":
      try {
        let medicine = await Medicine.findOne({ _id: id });
        res.send(medicine);
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    case "POST":
      // Update a specific medicine
      try {
        await Medicine.findOneAndUpdate({ _id: req.body._id }, req.body);
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        await Medicine.findOneAndRemove({ _id: id });
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
