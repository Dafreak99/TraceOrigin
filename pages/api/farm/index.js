import Farm from "../../../models/Farm";
import dbConnect from "@/lib/dbConnect";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/farm
// @desc Get detail information of your farm

export default async (req, res) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ createdBy: decoded }).populate("reject");

  // Change the return value to satisfy conditional rendering in Client

  if (farm) {
    res.send(farm);
  } else {
    res.send({ message: "Empty" });
  }

  //  There will cause an error if send NULL back
};
