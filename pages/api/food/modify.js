import Farm from "../../../models/Farm";
import Food from "../../../models/Food";
import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/food/modify
// @desc Update food info

export default async (req, res) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  let farm = await Farm.findOne({ themVaoBoi: decoded });

  //   let food = await Food.findOne({ _id: req.body._id });
  try {
    await Food.findOneAndUpdate({ _id: req.body._id }, req.body);
    res.send({ message: "OK" });
  } catch (error) {
    res.send({ message: error.message });
  }
};
