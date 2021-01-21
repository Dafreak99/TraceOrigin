import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";
import Business from "models/Business";
import Hatchery from "models/Hatchery";
import Farm from "models/Farm";

dbConnect();

// @route /api/hatchery
// @desc Get detail information about your hatcheries

export default async (req, res) => {
  const token = req.headers.authorization;
  const { method } = req;
  if (!token)
    return res.status(400).send({ message: "Bạn không có quyền truy cập" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let farm = await Farm.findOne({ themVaoBoi: decoded });

  switch (method) {
    case "GET":
      let hatcheries = await Hatchery.find({ farmId: farm._id });
      res.send(hatcheries);
      break;
    case "POST":
      try {
        let hatchery = new Hatchery({ ...req.body, farmId: farm._id });
        await hatchery.save();
        res.send(hatchery);
      } catch (error) {
        res.send({ message: error.message });
      }
      break;
    default:
      break;
  }
};
