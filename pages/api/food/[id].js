import Farm from "../../../models/Farm";
import Food from "../../../models/Food";
import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/farm
// @desc Get detail information of your farm

export default async (req, res) => {
  const token = req.headers.authorization;

  const {
    query: { id },
  } = req;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  let food = await Food.findOne({ _id: id });
  res.send(food);
};
