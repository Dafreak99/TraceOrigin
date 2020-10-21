import Farm from "../../../models/Farm";
import Food from "../../../models/Food";
import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";

dbConnect();

// @route /api/food
// @desc Get detail information of your farm

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  let farm = await Farm.findOne({ themVaoBoi: decoded });
  switch (method) {
    case "GET":
      let food = await Food.find({ farmId: farm._id });
      res.send(food);
      break;
    case "POST":
      try {
        let food = new Food(req.body);
        food.farmId = farm._id;
        await food.save();
        res.send({ message: "OK" });
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
