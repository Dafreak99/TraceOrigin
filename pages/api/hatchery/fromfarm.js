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
  let business = await Business.findOne({ farm: farm._id });

  switch (method) {
    case "GET":
      let hatcheries = await Hatchery.find({ businessId: business._id });
      res.send(hatcheries);
      break;

    default:
      break;
  }
};
