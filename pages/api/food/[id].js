import Farm from "../../../models/Farm";
import Food from "../../../models/Food";
import dbConnect from "@/lib/dbConnect";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/farm
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
      let food = await Food.findOne({ _id: id });
      res.send(food);
      break;
    case "POST":
      try {
        await Food.findOneAndUpdate({ _id: req.body._id }, req.body);
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        await Food.findOneAndRemove({ _id: id });
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }

      break;
    default:
      break;
  }
};
